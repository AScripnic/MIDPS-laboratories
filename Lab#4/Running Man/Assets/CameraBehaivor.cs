using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class CameraBehaivor : MonoBehaviour {
    private float distanceFromCamera;

    public GameObject Player;

	void Start () {
        distanceFromCamera = transform.position.x - Player.transform.position.x;
	}
	
	void Update () {
        transform.position = new Vector3(Player.transform.position.x + distanceFromCamera, transform.position.y, transform.position.z);
	}
}
