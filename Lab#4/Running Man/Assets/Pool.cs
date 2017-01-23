using System.Collections.Generic;
using UnityEngine;

public class Pool : MonoBehaviour
{
    public GameObject ObjectBox;
    private readonly Dictionary<GameObject, Queue<GameObject>> removedObjects = new Dictionary<GameObject, Queue<GameObject>>();
    private readonly Dictionary<GameObject, GameObject> generatedGameObjects = new Dictionary<GameObject, GameObject>();

    public GameObject GetObject(GameObject type)
    {
        GameObject obj;
        if (removedObjects.ContainsKey(type) && removedObjects[type].Count > 0)
            obj = removedObjects[type].Dequeue();
        else
        {
            obj = Instantiate(type);
            obj.transform.parent = ObjectBox.transform;
        }

        obj.SetActive(true);

        generatedGameObjects.Add(obj,type);
        return obj;
    }

    public void RemoveObject(GameObject gObject)
    {
        gObject.SetActive(false);
        if (!generatedGameObjects.ContainsKey(gObject))
        {
            return;
        }
        if (!removedObjects.ContainsKey(generatedGameObjects[gObject]))
            removedObjects.Add(generatedGameObjects[gObject],new Queue<GameObject>());
        removedObjects[generatedGameObjects[gObject]].Enqueue(gObject);
        generatedGameObjects.Remove(gObject);
    }

    public void Clear(GameObject gObject)
    {
        List<GameObject> toRemove = new List<GameObject>();

        foreach(var obj in generatedGameObjects)
            if (obj.Value.Equals(gObject))
                toRemove.Add(obj.Key);

        foreach(var obj in toRemove)
            RemoveObject(obj);
    }

    public void Clear()
    {
        List<GameObject> toRemove = new List<GameObject>(generatedGameObjects.Keys);

        foreach (var obj in toRemove)
            RemoveObject(obj);
    }
}
