"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { useAssets } from "@/contexts/AssetContext"

interface RotatingGlobeProps {
  width?: number
  height?: number
  className?: string
}

export default function RotatingGlobe({ width = 600, height = 600, className = "" }: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { globeData } = useAssets()

  useEffect(() => {
    if (!canvasRef.current || !globeData) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    if (!context) return

    const isMobile = window.innerWidth < 768
    const containerWidth = Math.min(width, window.innerWidth - 40)
    const containerHeight = Math.min(height, window.innerHeight - 100)
    const radius = Math.min(containerWidth, containerHeight) / 2.3

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const HYDERABAD: [number, number] = [78.4867, 17.3850]

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: any): boolean => {
      const geometry = feature.geometry
      if (geometry.type === "Polygon") {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false
        }
        return true
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    const dotSpacing = isMobile ? 24 : 16

    const generateDotsInPolygon = (feature: any) => {
      const dots: [number, number][] = []
      const bounds = d3.geoBounds(feature)
      const [[minLng, minLat], [maxLng, maxLat]] = bounds
      const stepSize = dotSpacing * 0.08
      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat]
          if (pointInFeature(point, feature)) dots.push(point)
        }
      }
      return dots
    }

    interface DotData { lng: number; lat: number }
    const allDots: DotData[] = []

    // Use pre-fetched globe data
    const landFeatures = globeData
    landFeatures.features.forEach((feature: any) => {
      const dots = generateDotsInPolygon(feature)
      dots.forEach(([lng, lat]) => { allDots.push({ lng, lat }) })
    })
    setIsLoading(false)

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.strokeStyle = "hsl(200, 80%, 50%)"
      context.lineWidth = 0.5 * scaleFactor
      context.globalAlpha = 0.12
      context.stroke()
      context.globalAlpha = 1

      const graticule = d3.geoGraticule()
      context.beginPath()
      path(graticule())
      context.strokeStyle = "hsl(200, 80%, 50%)"
      context.lineWidth = 0.4 * scaleFactor
      context.globalAlpha = 0.06
      context.stroke()
      context.globalAlpha = 1

      context.beginPath()
      landFeatures.features.forEach((feature: any) => { path(feature) })
      context.strokeStyle = "hsl(200, 80%, 50%)"
      context.lineWidth = 0.6 * scaleFactor
      context.globalAlpha = 0.2
      context.stroke()
      context.globalAlpha = 1

      allDots.forEach((dot) => {
        const projected = projection([dot.lng, dot.lat])
        if (projected && projected[0] >= 0 && projected[0] <= containerWidth && projected[1] >= 0 && projected[1] <= containerHeight) {
          context.beginPath()
          context.arc(projected[0], projected[1], 0.8 * scaleFactor, 0, 2 * Math.PI)
          context.fillStyle = "hsl(200, 80%, 50%)"
          context.globalAlpha = 0.15
          context.fill()
          context.globalAlpha = 1
        }
      })

      // Hyderabad marker
      const hydProjected = projection(HYDERABAD)
      if (hydProjected) {
        const center = projection.invert!([containerWidth / 2, containerHeight / 2])
        if (center) {
          const d = d3.geoDistance(HYDERABAD, center as [number, number])
          if (d < Math.PI / 2) {
            const pulsePhase = (Date.now() % 2000) / 2000
            const pulseRadius = 4 + pulsePhase * 14
            context.beginPath()
            context.arc(hydProjected[0], hydProjected[1], pulseRadius * scaleFactor, 0, 2 * Math.PI)
            context.strokeStyle = "hsl(200, 80%, 50%)"
            context.lineWidth = 1.5 * scaleFactor
            context.globalAlpha = 0.5 * (1 - pulsePhase)
            context.stroke()
            context.globalAlpha = 1

            context.beginPath()
            context.arc(hydProjected[0], hydProjected[1], 3.5 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = "hsl(200, 80%, 50%)"
            context.fill()

            context.beginPath()
            context.arc(hydProjected[0], hydProjected[1], 10 * scaleFactor, 0, 2 * Math.PI)
            const gradient = context.createRadialGradient(
              hydProjected[0], hydProjected[1], 0,
              hydProjected[0], hydProjected[1], 10 * scaleFactor
            )
            gradient.addColorStop(0, "hsla(200, 80%, 50%, 0.35)")
            gradient.addColorStop(1, "hsla(200, 80%, 50%, 0)")
            context.fillStyle = gradient
            context.fill()

            context.font = `bold ${10 * scaleFactor}px Switzer, system-ui, sans-serif`
            context.fillStyle = "hsl(200, 80%, 50%)"
            context.globalAlpha = 0.85
            context.textAlign = "left"
            context.fillText("HYDERABAD", hydProjected[0] + 12 * scaleFactor, hydProjected[1] + 4 * scaleFactor)
            context.globalAlpha = 1
          }
        }
      }
    }

    const rotation: [number, number] = [-78.5, -17.4]
    let autoRotate = true
    let isVisible = true
    let rafId: number | null = null

    let frameCount = 0
    const frameSkip = isMobile ? 2 : 1 // Render every Nth frame on mobile

    const loop = () => {
      if (!isVisible) { rafId = null; return }
      frameCount++
      if (autoRotate && frameCount % frameSkip === 0) {
        rotation[0] += isMobile ? 0.3 : 0.8
        projection.rotate(rotation)
        render()
      }
      rafId = requestAnimationFrame(loop)
    }

    // IntersectionObserver: pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !rafId) {
          rafId = requestAnimationFrame(loop)
        }
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) observer.observe(containerRef.current)

    // Initial render
    render()
    rafId = requestAnimationFrame(loop)

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (e: MouseEvent) => {
        rotation[0] = startRotation[0] + (e.clientX - startX) * 0.5
        rotation[1] = startRotation[1] - (e.clientY - startY) * 0.5
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]))
        projection.rotate(rotation)
        render()
      }

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }

      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    canvas.addEventListener("mousedown", handleMouseDown)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      observer.disconnect()
      canvas.removeEventListener("mousedown", handleMouseDown)
    }
  }, [width, height, globeData])

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground/40 font-medium animate-pulse">LOADING GLOBE...</span>
        </div>
      )}
      <canvas ref={canvasRef} className="cursor-grab active:cursor-grabbing" />
    </div>
  )
}
