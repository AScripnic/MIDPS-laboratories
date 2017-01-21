#pragma strict

private var playerRigidbody : Rigidbody2D;

function Start () {
	playerRigidbody = GetComponent.<Rigidbody2D>();
}

function Update () {
	playerRigidbody.velocity.x = PlayerBehaivor.startSpeed;
	
}
