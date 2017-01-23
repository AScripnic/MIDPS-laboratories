using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ObstaclesGenerator : MonoBehaviour {

    public GameObject[] Obstacles;
    public GameObject GeneratingPoint;
    public GameObject RemovingPoint;
    public GameMechanics GameMaster;
    public float obstacleGape;
    public Pool Pool;
    public Transform Player;

    private Queue<GameObject> Clones = new Queue<GameObject>();
    private float lastObstacleXPosition = 0;
    private float spaceCoeficient = 1.07f;

    void Start() {
        GenerateNewObstacle(Player.position.x);
    }

    void Update() {
        float generaingPointX = GeneratingPoint.transform.position.x;

        if (lastObstacleXPosition < generaingPointX) {
            GenerateNewObstacle(lastObstacleXPosition);
        }

        if (Clones.Peek().transform.position.x < RemovingPoint.transform.position.x) {
            Pool.RemoveObject(Clones.Dequeue());
        }

        if (Time.timeSinceLevelLoad / GameMaster.NextIncreaseAt > 1) {
            obstacleGape *= spaceCoeficient;
        }
    }

    void GenerateNewObstacle(float x) {
        GameObject nextObstacle = Pool.GetObject(Obstacles[Random.Range(0, Obstacles.Length)]);

        nextObstacle.transform.position = new Vector2(x + obstacleGape, 0);

        Clones.Enqueue(nextObstacle);

        lastObstacleXPosition = nextObstacle.transform.position.x;
    }
}
