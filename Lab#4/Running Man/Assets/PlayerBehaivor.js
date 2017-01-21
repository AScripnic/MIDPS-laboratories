#pragma strict

private var left : KeyCode = KeyCode.LeftArrow;
private var right : KeyCode = KeyCode.RightArrow;
private var up : KeyCode = KeyCode.UpArrow;
private var playerRigidbody : Rigidbody2D;

public var movingSpeed : float; 

static public var startSpeed : float;

function Start() {
PlayerBehaivor.startSpeed = movingSpeed;
	IntializeVariables();
}

function IntializeVariables() {
	playerRigidbody = GetComponent.<Rigidbody2D>();
}

function Update() {
	Movement();
	Jump();
}	

function Jump() {
	if (Input.GetKeyDown(up)) {
		playerRigidbody.velocity.y = 25;
	}
}

function Movement() {
	if (Input.GetKey(left)) {
		playerRigidbody.velocity.x = -10;
	} else if (Input.GetKey(right)){
		playerRigidbody.velocity.x = 10;
	} else {
		playerRigidbody.velocity.x = 0;
	}
}

