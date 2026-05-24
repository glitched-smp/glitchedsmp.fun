import Cloud0 from "../assets/png/cloud0.png"
import Cloud1 from "../assets/png/cloud1.png"
import Cloud2 from "../assets/png/cloud2.png"
import Cloud3 from "../assets/png/cloud3.png"
import Cloud4 from "../assets/png/cloud4.png"

type ActiveCloud = {
    element: HTMLImageElement
    speed: number
    x: number
    y: number
}

const activeClouds: ActiveCloud[] = []
let cloudInterval: number | undefined
let cloudFrame = 0

function cloudsDisabled() {
    return document.documentElement.classList.contains("clouds-off")
}

function clearClouds() {
    while (activeClouds.length) {
        activeClouds.pop()?.element.remove()
    }
}

function spawnCloud(parent: HTMLElement) {
    if (cloudsDisabled()) return

    const element = document.createElement("img")
    element.id = `${Math.random()}${Math.random()}${Math.random()}`

    const clouds = [Cloud0, Cloud1, Cloud2, Cloud3, Cloud4]
    element.src = clouds[Math.floor(Math.random() * clouds.length)].src
    element.className = "opacity-75 absolute z-4 site-cloud"
    parent.appendChild(element)
    activeClouds.push({
        element,
        speed: Math.max(0.35, Math.random() * 0.75),
        x: window.innerWidth,
        y: Math.floor(Math.random() * (window.innerHeight - 101)) + 100,
    })
}

function updateClouds() {
    if (cloudsDisabled()) {
        clearClouds()
        cloudFrame = 0
        return
    }

    for (let i = activeClouds.length - 1; i >= 0; i--) {
        const cloud = activeClouds[i]
        if (!cloud.element) continue
        if (cloud.x <= -175) {
            cloud.element.remove()
            activeClouds.splice(activeClouds.indexOf(cloud), 1)
            continue
        }

        cloud.x -= cloud.speed
        cloud.element.style.left = `${cloud.x}px`
        cloud.element.style.top = `${cloud.y}px`
    }

    cloudFrame = requestAnimationFrame(updateClouds)
}

function startClouds(parent: HTMLElement) {
    if (cloudsDisabled()) {
        clearClouds()
        return
    }

    if (!cloudInterval) {
        cloudInterval = window.setInterval(() => spawnCloud(parent), 500)
    }

    if (!cloudFrame) updateClouds()
}

function stopClouds() {
    if (cloudInterval) {
        window.clearInterval(cloudInterval)
        cloudInterval = undefined
    }

    if (cloudFrame) {
        cancelAnimationFrame(cloudFrame)
        cloudFrame = 0
    }

    clearClouds()
}

document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home")
    if (!homeSection) return

    startClouds(homeSection)

    window.addEventListener("glitched-settings-change", () => {
        if (cloudsDisabled()) {
            stopClouds()
            return
        }

        startClouds(homeSection)
    })
})
