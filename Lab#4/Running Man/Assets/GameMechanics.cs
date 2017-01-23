using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GameMechanics : MonoBehaviour {
    private int timesIncreased = 1;

    public float NextLevelInSeconds;
    public float NextIncreaseAt;

    void Start() {
        NextIncreaseAt = NextLevelInSeconds * timesIncreased;
    }

    void Update() {
        if (Time.timeSinceLevelLoad > NextIncreaseAt) {
            timesIncreased++;

            NextIncreaseAt = NextLevelInSeconds * timesIncreased;
        }
    }
}
