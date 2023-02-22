import { Renderer } from 'expo-three';

import { THREE } from 'expo-three';
global.THREE = global.THREE || THREE;
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import { ExpoWebGLRenderingContext, GLView } from 'expo-gl';
import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber/native';
import { View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");


export default function MetaraceView() {
  const [ModelGeometry, setModelGeometry] = useState()

  useEffect(() => {
    loadModel()
    createModelGeometry()
  }, [])

  function createModelGeometry() {
    const vertices = new Float32Array([
      // front
      -1, -1, 1,
      1, -1, 1,
      1, 1, 1,
      -1, 1, 1,
      // back
      -1, -1, -1,
      1, -1, -1,
      1, 1, -1,
      -1, 1, -1,
    ]);

    const indices = new Uint32Array([
      0, 1, 2, 0, 2, 3, // front
      1, 5, 6, 1, 6, 2, // right
      5, 4, 7, 5, 7, 6, // back
      4, 0, 3, 4, 3, 7, // left
      3, 2, 6, 3, 6, 7, // top
      4, 5, 1, 4, 1, 0  // bottom
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    // console.log("geometry", geometry)

    setModelGeometry(geometry)
    return geometry;
  }

  async function loadModel() {
    // const asset = Asset.fromModule(require('./cube.obj'));
    // await asset.downloadAsync();

    // const loader = new OBJLoader();
    // loader.load(asset.localUri, group => {

    //   const groupGeo = group.children[0].geometry

    //   // get the vertices of the geometry
    //   const vertices = groupGeo.attributes.position.array;
    //   // console.log("vertices", vertices)

    //   const indices = new Uint32Array([
    //     0, 1, 2, 0, 2, 3, // front
    //     1, 5, 6, 1, 6, 2, // right
    //     5, 4, 7, 5, 7, 6, // back
    //     4, 0, 3, 4, 3, 7, // left
    //     3, 2, 6, 3, 6, 7, // top
    //     4, 5, 1, 4, 1, 0  // bottom
    //   ]);

    //   const geometry = new THREE.BufferGeometry();
    //   geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    //   geometry.setIndex(new THREE.BufferAttribute(indices, 1));




      // setModelGeometry(geometry)


      // get the indices of the geometry
      // console.log("indices", indices)


    // });
  }


  const Scene = ({ modelGeometry }) => {



    return <group>
      <mesh>
        <bufferGeometry attach="geometry" {...modelGeometry} />
        <meshStandardMaterial color="red" />
      </mesh>
      {/* <mesh>
      <planeGeometry args={[2, 10]} />
    </mesh> */}
    </group>
  }





  return (
    <View style={{ width: width, height: height }}>
      <Canvas >
        {ModelGeometry &&
          <Scene modelGeometry={ModelGeometry} />
        }
        <ambientLight intensity={0.5} />
      </Canvas>
    </View>
  );
}