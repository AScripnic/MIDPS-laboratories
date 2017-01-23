using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;
using UnityEngine.UI;

public class PlayerBehaivor : MonoBehaviour {
    private Rigidbody2D playerRigidbody;
    private float speedBoost = 1.1f;
    private float getUpTime;

    public float CharacterSpeed;
    public float SlideDuration;
    public float JumpPower = 40;
    public GameMechanics GameMaster;
    public LayerMask Ground;
    public LayerMask Obstacle;
    public Text Score;

    private Vector2 startPos;
    private Vector2 direction;
    private bool directionChosen;
    private bool grounded;
    private bool sliding;
    private bool gameOver = false;

	void Start () {
        playerRigidbody = GetComponent<Rigidbody2D>();

        SetVelocity(CharacterSpeed, playerRigidbody.velocity.y);
    }
	
	void Update () {
        if (!gameOver) {
            SetVelocity(CharacterSpeed, playerRigidbody.velocity.y);
            Score.GetComponent<Text>().text = "Score: " + (Mathf.FloorToInt(Time.timeSinceLevelLoad * 1000));
        } else if (Input.GetMouseButtonDown(0) || Input.touchCount > 0) {
            SceneManager.LoadScene(SceneManager.GetActiveScene().name);
        }

        if (Time.timeSinceLevelLoad  / GameMaster.NextIncreaseAt > 1) {
            CharacterSpeed *= speedBoost;
        }

        if (Physics2D.IsTouchingLayers(GetComponent<BoxCollider2D>(), Obstacle)) {
            CharacterSpeed = 0;
            JumpPower = 0;
            gameOver = true;

            SetVelocity(0, 0);
            GetComponent<Rigidbody2D>().AddForce((Vector3.left + Vector3.up) * 30, ForceMode2D.Impulse);
        }

        if (getUpTime < Time.timeSinceLevelLoad) {
            slide(false);
        }

        keyboardMovement();
        touchMovement();

        GetComponent<Animator>().SetBool("grounded", grounded);
        GetComponent<Animator>().SetBool("sliding", sliding);
        GetComponent<Animator>().SetFloat("speed", CharacterSpeed);

    }

    private void touchMovement() {
        if (Input.touchCount > 0)
        {
            Touch touch = Input.GetTouch(0);
            
            switch (touch.phase) {
                case TouchPhase.Began:
                    startPos = touch.position;
                    directionChosen = false;
                    break;
                    
                case TouchPhase.Moved:
                    direction = touch.position - startPos;
                    break;
                    
                case TouchPhase.Ended:
                    directionChosen = true;
                    break;
            }
        }

        if (directionChosen) {
            directionChosen = false;

            if (direction.y < 0) {
                getUpTime = Time.timeSinceLevelLoad + SlideDuration;
                slide(true);
            } else if (grounded) {
                SetVelocity(playerRigidbody.velocity.x, JumpPower);
                slide(false);
            }
        }

    }

    private void keyboardMovement() {
        grounded = Physics2D.IsTouchingLayers(GetComponent<Collider2D>(), Ground);

        if (Input.GetKeyDown(KeyCode.UpArrow)){
            if (grounded) {
                SetVelocity(playerRigidbody.velocity.x, JumpPower);
                slide(false);
            }
        }

        if (Input.GetKey(KeyCode.DownArrow)) {
            getUpTime = Time.timeSinceLevelLoad + SlideDuration;
            slide(true);
        }

    }

    private void slide(bool sliding) {
        if (sliding) {
            GetComponent<BoxCollider2D>().size = new Vector2(0.2f, 0.1227661f);
            GetComponent<BoxCollider2D>().offset = new Vector2(0.015f, -0.09888297f);
        } else {
            GetComponent<BoxCollider2D>().size = new Vector2(0.105f, 0.24f);
            GetComponent<BoxCollider2D>().offset = new Vector2(0.01f, -0.04f);
        }

        this.sliding = sliding;
    }

    private void SetVelocity(float x, float y) {
        playerRigidbody.velocity = new Vector2(x, y);
    }
}
