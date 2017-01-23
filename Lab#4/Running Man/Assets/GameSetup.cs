using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameSetup : MonoBehaviour {
    public Camera MainCamera;
    public GameObject GroundGeneratorPoint;
    public Transform Player;

    public Transform Ground;
	
	void Start () {
        Ground.position = new Vector2(0f, MainCamera.ScreenToWorldPoint(new Vector2(0f, 0f)).y + 0.5f);
        GroundGeneratorPoint.transform.position = new Vector3(
            MainCamera.ScreenToWorldPoint(new Vector2(0f, 0f)).x - 2f,
            Ground.position.y,
            GroundGeneratorPoint.transform.position.z
        );

        //TODO: Set Player position on floor
        Player.position = new Vector3(0,0,0);
    }
}
