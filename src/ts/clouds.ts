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

function spawnCloud(parent: HTMLElement) {
    const element = document.createElement("img")
    element.id = `${Math.random()}${Math.random()}${Math.random()}`

    const clouds = [Cloud0, Cloud1, Cloud2, Cloud3, Cloud4]
    element.src = clouds[Math.floor(Math.random() * clouds.length)].src
    element.className = "absolute z-4"
    parent.appendChild(element)
    activeClouds.push({
        element,
        speed: Math.floor(Math.random() * 3) * .5,
        x: window.innerWidth,
        y: Math.floor(Math.random() * (window.innerHeight - 101)) + 100,
    })
}

function updateClouds() {
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

    requestAnimationFrame(updateClouds)
}

document.addEventListener("DOMContentLoaded", () => {
    const homeSection = document.getElementById("home")
    if (!homeSection) return
    setInterval(() => spawnCloud(homeSection), 250)
    updateClouds()
})
