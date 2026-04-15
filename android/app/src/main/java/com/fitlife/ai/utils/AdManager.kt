package com.fitlife.ai.utils

import android.app.Activity
import android.content.Context
import android.view.View
import com.google.android.gms.ads.AdRequest
import com.google.android.gms.ads.AdView
import com.google.android.gms.ads.LoadAdError
import com.google.android.gms.ads.interstitial.InterstitialAd
import com.google.android.gms.ads.interstitial.InterstitialAdLoadCallback

object AdManager {
    private var mInterstitialAd: InterstitialAd? = null

    // Test IDs from Google
    private const val BANNER_ID = "ca-app-pub-3940256099942544/6300978111"
    private const val INTERSTITIAL_ID = "ca-app-pub-3940256099942544/1033173712"

    fun loadBanner(adView: AdView) {
        val adRequest = AdRequest.Builder().build()
        adView.loadAd(adRequest)
    }

    fun loadInterstitial(context: Context) {
        val adRequest = AdRequest.Builder().build()
        InterstitialAd.load(context, INTERSTITIAL_ID, adRequest, object : InterstitialAdLoadCallback() {
            override fun onAdFailedToLoad(adError: LoadAdError) {
                mInterstitialAd = null
            }

            override fun onAdLoaded(interstitialAd: InterstitialAd) {
                mInterstitialAd = interstitialAd
            }
        })
    }

    fun showInterstitial(activity: Activity, onDismiss: () -> Unit) {
        if (mInterstitialAd != null) {
            mInterstitialAd?.show(activity)
            mInterstitialAd = null
            loadInterstitial(activity) // Reload for next time
            onDismiss()
        } else {
            onDismiss()
        }
    }
}
