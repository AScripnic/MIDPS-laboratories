using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GroundGenerator : MonoBehaviour {
    public GameObject Ground;
    public GameObject GeneratingPoint;

    private GameObject groundClone;

    void Start() {
        Vector3 position = Ground.transform.position;
        Vector3 size = Ground.transform.localScale;

        groundClone = Instantiate(Ground, new Vector3(position.x + size.x, position.y, position.z), Quaternion.identity);
    }

	void Update () {
        if (genPointPosition.x > overObject.transform.position.x && genPointPosition.x < getElementEnd(overObject)) {
            Vector3 position = overObject.transform.position;
            Vector3 size = overObject.transform.localScale;
            
            standByObject.transform.position = new Vector3(position.x + size.x, position.y, position.z);
        }
	}

    private GameObject overObject {
        get {
            return genPointPosition.x > getElementStart(Ground) && genPointPosition.x < getElementEnd(Ground) ? Ground : groundClone;
        }
    }

    private GameObject standByObject
    {
        get
        {
            return genPointPosition.x > getElementStart(Ground) && genPointPosition.x < getElementEnd(Ground) ? groundClone : Ground;
        }
    }

    private Vector3 genPointPosition {
        get {
            return GeneratingPoint.transform.position;
        }
    }

    private float getElementStart(GameObject ground) {
        return ground.transform.position.x - (ground.transform.localScale.x / 2);
    }

    private float getElementEnd(GameObject ground) {
        return ground.transform.position.x + (ground.transform.localScale.x / 2);
    }
}
