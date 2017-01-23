using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerBehaivor : MonoBehaviour {
    private Rigidbody2D playerRigidbody;
    private float lastSpeedPower;
    private float speedBoost = 1.1f;

    public float CharacterSpeed;
    public float JumpPower = 40;
    public GameMechanics GameMaster;
    public LayerMask Ground;

    private bool grounded;

	void Start () {
        playerRigidbody = GetComponent<Rigidbody2D>();
        lastSpeedPower = CharacterSpeed;

        SetVelocity(CharacterSpeed, playerRigidbody.velocity.y);
    }
	
	void Update () {
        if (lastSpeedPower != CharacterSpeed) {
            SetVelocity(CharacterSpeed, playerRigidbody.velocity.y);
        }

        if (Time.timeSinceLevelLoad  / GameMaster.NextIncreaseAt > 1) {
            CharacterSpeed *= speedBoost;
        }

        Movement();
    }

    private void Movement() {
        grounded = Physics2D.IsTouchingLayers(GetComponent<Collider2D>(), Ground);

        if (Input.GetKeyDown(KeyCode.UpArrow)){
            if (grounded) {
                SetVelocity(playerRigidbody.velocity.x, JumpPower);
            }
        }

        /*if (Input.GetKey(KeyCode.DownArrow)) {
            transform.localScale = new Vector3(transform.localScale.x, 1f, transform.localScale.y);
        } else {
            transform.localScale = new Vector3(transform.localScale.x, 3f, transform.localScale.y);
        }*/
    }

    private void SetVelocity(float x, float y) {
        playerRigidbody.velocity = new Vector2(x, y);
    }
}
