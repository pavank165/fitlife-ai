package com.fitlife.ai.utils

import com.google.firebase.auth.ktx.auth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.tasks.await

object FirebaseManager {
    private val db = Firebase.firestore
    private val auth = Firebase.auth

    suspend fun getUserStats(): Map<String, Any>? {
        val uid = auth.currentUser?.uid ?: return null
        return try {
            val document = db.collection("users").document(uid).get().await()
            document.data
        } catch (e: Exception) {
            null
        }
    }

    suspend fun saveWorkout(workoutData: Map<String, Any>): Boolean {
        val uid = auth.currentUser?.uid ?: return false
        return try {
            db.collection("users").document(uid)
                .collection("completedWorkouts")
                .add(workoutData)
                .await()
            true
        } catch (e: Exception) {
            false
        }
    }
}
