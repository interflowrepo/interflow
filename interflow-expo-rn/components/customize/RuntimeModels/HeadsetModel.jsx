import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export default function Headset(props) {
    const material = new THREE.MeshStandardMaterial({
        color: 'black',
        roughness: 0.3,
        metalness: 0.5,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({ color: 'grey', wireframe: true });

    const headsetVertices = useMemo(
        () => [
            // Headset Body
            -4, -5, -5, // 0
            4, -5, -5, // 1
            4, 5, -5, // 2
            -4, 5, -5, // 3
            -4, -5, 5, // 4
            4, -5, 5, // 5
            4, 5, 5, // 6
            -4, 5, 5, // 7

            // Ear Cups
            -7, -1, -1, // 8
            -3, -6, -1, // 9
            3, -6, -1, // 10
            7, -1, -1, // 11
            7, 1, -1, // 12
            3, 6, -1, // 13
            -3, 6, -1, // 14
            -7, 1, -1, // 15
            -7, -1, 1, // 16
            -3, -6, 1, // 17
            3, -6, 1, // 18
            7, -1, 1, // 19
            7, 1, 1, // 20
            3, 6, 1, // 21
            -3, 6, 1, // 22
            -7, 1, 1, // 23

            // Microphone
            -1, -3, 6, // 24
            1, -3, 6, // 25
            1, -3, 11, // 26
            -1, -3, 11, // 27
        ],
        []
    );

    const headsetIndices = useMemo(
        () => [
            // Headset Body
            0, 1, 2,
            2, 3, 0,
            1, 5, 6,
            6, 2, 1,
            5, 4, 7,
            7, 6, 5,
            4, 0, 3,
            3, 7, 4,
            3, 2, 6,
            6, 7, 3,
            4, 5, 1,
            1, 0, 4,

            // Ear Cups
            8, 9, 10,
            10, 11, 8,
            11, 12, 13,
            13, 14, 11,
            14, 15, 16,
            16, 17, 14,
            17, 18,
            18, 19, 20,
            20, 21, 18,
            21, 22, 23,
            23, 14, 21,
            22, 13, 12,
            12, 23, 22,
            16, 15, 8,
            8, 9, 16,
            10, 19, 18,
            18, 11, 10,
            12, 11, 18,
            18, 21, 12,
            13, 22, 23,
            23, 14, 13,

            // Microphone
            24, 25, 26,
            26, 27, 24,
            25, 24, 27,
            27, 26, 25,
        ],
        []
    );

    const headsetGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(headsetVertices), [headsetVertices]);
    headsetGeometry.setIndex(headsetIndices);

    const arcVertices = useMemo(
        () => {
            const radius = 11;
            const segments = 64;
            const angleStart = -Math.PI / 2;
            const angleEnd = Math.PI / 2;


            const vertices = [];
            for (let i = 0; i <= segments; i++) {
                const angle = THREE.MathUtils.lerp(angleStart, angleEnd, i / segments);
                vertices.push(radius * Math.cos(angle), 5, radius * Math.sin(angle));
            }
            return vertices;
        },
        []
    );

    const arcIndices = useMemo(
        () => {
            const indices = [];
            for (let i = 0; i < arcVertices.length / 3 - 1; i++) {
                indices.push(i, i + 1);
            }
            return indices;
        },
        [arcVertices]
    );

    const arcGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(arcVertices), [arcVertices]);
    arcGeometry.setIndex(arcIndices);

    return (
        <group {...props}>
            {/* Headset Body */}
            <mesh geometry={headsetGeometry} material={material} />

            {/* Ear Cups */}
            <mesh geometry={new THREE.TorusBufferGeometry(6, 1.5, 8, 32)} material={wireMaterial} position={[-7, 1, 0]} />
            <mesh geometry={new THREE.TorusBufferGeometry(6, 1.5, 8, 32)} material={wireMaterial} position={[7, 1, 0]} />

            {/* Microphone */}
            <mesh geometry={new THREE.CylinderBufferGeometry(0.8, 0.8, 5, 32)} material={material} position={[0, -3, 8.5]} />
            <mesh geometry={new THREE.SphereBufferGeometry(1, 32, 32)} material={material} position={[0, -3, 11]} />
            <mesh geometry={new THREE.CircleBufferGeometry(1.2, 32)} material={wireMaterial} position={[0, -3, 11]} />
            <mesh geometry={new THREE.ConeBufferGeometry(1.2, 2, 16)} material={material} position={[0, -3, 12]} />

            {/* Headband */}
            <mesh geometry={arcGeometry} material={material} position={[0, 7, 0]} />

            {/* Headband Padding */}
            <mesh geometry={new THREE.BoxBufferGeometry(22.5, 0.6, 4.5)} material={material} position={[0, 7.7, 0]} />

            {/* Headband Adjuster */}
            <mesh geometry={new THREE.CylinderBufferGeometry(1.5, 1.5, 3, 32)} material={material} position={[0, 8.5, 0]} rotation={[Math.PI / 2, 0, 0]} />

            {/* Cord */}
            <mesh geometry={new THREE.CylinderBufferGeometry(0.2, 0.2, 12, 32)} material={material} position={[0, -8, 0]} />
        </group>
    );

}
