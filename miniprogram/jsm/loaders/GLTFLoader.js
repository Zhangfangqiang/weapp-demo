export default function(e){let{AnimationClip:w,Bone:l,BufferAttribute:_,BufferGeometry:c,ClampToEdgeWrapping:r,Color:h,DefaultLoadingManager:a,DirectionalLight:i,DoubleSide:v,FileLoader:u,FrontSide:n,Group:m,InterleavedBuffer:x,InterleavedBufferAttribute:b,Interpolant:t,InterpolateDiscrete:s,InterpolateLinear:I,Line:g,LineBasicMaterial:T,LineLoop:M,LineSegments:S,LinearFilter:d,LinearMipmapLinearFilter:y,LinearMipmapNearestFilter:o,Loader:L,LoaderUtils:R,Material:E,Math:f,Matrix4:A,Mesh:P,MeshBasicMaterial:N,MeshStandardMaterial:U,MirroredRepeatWrapping:p,NearestFilter:F,NearestMipmapLinearFilter:O,NearestMipmapNearestFilter:G,NumberKeyframeTrack:C,Object3D:D,OrthographicCamera:H,PerspectiveCamera:B,PointLight:k,Points:K,PointsMaterial:j,PropertyBinding:V,QuaternionKeyframeTrack:X,RGBAFormat:z,RGBFormat:Y,RepeatWrapping:W,Scene:Z,ShaderLib:J,ShaderMaterial:$,Skeleton:Q,SkinnedMesh:q,SpotLight:ee,TextureLoader:re,TriangleFanDrawMode:ae,TriangleStripDrawMode:ne,UniformsUtils:te,Vector2:ie,VectorKeyframeTrack:se,VertexColors:oe,sRGBEncoding:ue,global:le}=e;function fe(e){this.manager=e!==undefined?e:a;this.dracoLoader=null;this.ddsLoader=null}fe.prototype={constructor:fe,crossOrigin:"anonymous",load:function(r,a,e,n){var t=this;var i;if(this.resourcePath!==undefined){i=this.resourcePath}else if(this.path!==undefined){i=this.path}else{i=R.extractUrlBase(r)}t.manager.itemStart(r);var s=function(e){if(n){n(e)}else{console.error(e)}t.manager.itemError(r);t.manager.itemEnd(r)};var o=new u(t.manager);o.setPath(this.path);o.setResponseType("arraybuffer");if(t.crossOrigin==="use-credentials"){o.setWithCredentials(true)}o.load(r,function(e){try{t.parse(e,i,function(e){a(e);t.manager.itemEnd(r)},s)}catch(e){s(e)}},e,s)},setCrossOrigin:function(e){this.crossOrigin=e;return this},setPath:function(e){this.path=e;return this},setResourcePath:function(e){this.resourcePath=e;return this},setDRACOLoader:function(e){this.dracoLoader=e;return this},setDDSLoader:function(e){this.ddsLoader=e;return this},parse:function(e,r,a,n){var t;var i={};if(typeof e==="string"){t=e}else{var s=R.decodeText(new Uint8Array(e,0,4));if(s===me){try{i[ce.KHR_BINARY_GLTF]=new Me(e)}catch(e){if(n)n(e);return}t=i[ce.KHR_BINARY_GLTF].content}else{t=R.decodeText(new Uint8Array(e))}}var o=JSON.parse(t);if(o.asset===undefined||o.asset.version[0]<2){if(n)n(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead."));return}if(o.extensionsUsed){for(var u=0;u<o.extensionsUsed.length;++u){var l=o.extensionsUsed[u];var f=o.extensionsRequired||[];switch(l){case ce.KHR_LIGHTS_PUNCTUAL:i[l]=new ve(o);break;case ce.KHR_MATERIALS_UNLIT:i[l]=new he;break;case ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:i[l]=new Le;break;case ce.KHR_DRACO_MESH_COMPRESSION:i[l]=new Se(o,this.dracoLoader);break;case ce.MSFT_TEXTURE_DDS:i[ce.MSFT_TEXTURE_DDS]=new de(this.ddsLoader);break;case ce.KHR_TEXTURE_TRANSFORM:i[ce.KHR_TEXTURE_TRANSFORM]=new ye;break;default:if(f.indexOf(l)>=0){console.warn('THREE.GLTFLoader: Unknown extension "'+l+'".')}}}}var p=new Ve(o,i,{path:r||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager});p.parse(a,n)}};function pe(){var a={};return{get:function(e){return a[e]},add:function(e,r){a[e]=r},remove:function(e){delete a[e]},removeAll:function(){a={}}}}var ce={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function de(e){if(!e){throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing DDSLoader")}this.name=ce.MSFT_TEXTURE_DDS;this.ddsLoader=e}function ve(e){this.name=ce.KHR_LIGHTS_PUNCTUAL;var r=e.extensions&&e.extensions[ce.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=r.lights||[]}ve.prototype.loadLight=function(e){var r=this.lightDefs[e];var a;var n=new h(16777215);if(r.color!==undefined)n.fromArray(r.color);var t=r.range!==undefined?r.range:0;switch(r.type){case"directional":a=new i(n);a.target.position.set(0,0,-1);a.add(a.target);break;case"point":a=new k(n);a.distance=t;break;case"spot":a=new ee(n);a.distance=t;r.spot=r.spot||{};r.spot.innerConeAngle=r.spot.innerConeAngle!==undefined?r.spot.innerConeAngle:0;r.spot.outerConeAngle=r.spot.outerConeAngle!==undefined?r.spot.outerConeAngle:Math.PI/4;a.angle=r.spot.outerConeAngle;a.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle;a.target.position.set(0,0,-1);a.add(a.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}a.position.set(0,0,0);a.decay=2;if(r.intensity!==undefined)a.intensity=r.intensity;a.name=r.name||"light_"+e;return Promise.resolve(a)};function he(){this.name=ce.KHR_MATERIALS_UNLIT}he.prototype.getMaterialType=function(){return N};he.prototype.extendParams=function(e,r,a){var n=[];e.color=new h(1,1,1);e.opacity=1;var t=r.pbrMetallicRoughness;if(t){if(Array.isArray(t.baseColorFactor)){var i=t.baseColorFactor;e.color.fromArray(i);e.opacity=i[3]}if(t.baseColorTexture!==undefined){n.push(a.assignTexture(e,"map",t.baseColorTexture))}}return Promise.all(n)};var me="glTF";var ge=12;var Te={JSON:1313821514,BIN:5130562};function Me(e){this.name=ce.KHR_BINARY_GLTF;this.content=null;this.body=null;var r=new DataView(e,0,ge);this.header={magic:R.decodeText(new Uint8Array(e.slice(0,4))),version:r.getUint32(4,true),length:r.getUint32(8,true)};if(this.header.magic!==me){throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.")}else if(this.header.version<2){throw new Error("THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.")}var a=new DataView(e,ge);var n=0;while(n<a.byteLength){var t=a.getUint32(n,true);n+=4;var i=a.getUint32(n,true);n+=4;if(i===Te.JSON){var s=new Uint8Array(e,ge+n,t);this.content=R.decodeText(s)}else if(i===Te.BIN){var o=ge+n;this.body=e.slice(o,o+t)}n+=t}if(this.content===null){throw new Error("THREE.GLTFLoader: JSON content not found.")}}function Se(e,r){if(!r){throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.")}this.name=ce.KHR_DRACO_MESH_COMPRESSION;this.json=e;this.dracoLoader=r}Se.prototype.decodePrimitive=function(e,r){var a=this.json;var n=this.dracoLoader;var t=e.extensions[this.name].bufferView;var i=e.extensions[this.name].attributes;var s={};var o={};var u={};for(var l in i){var f=be[l]||l.toLowerCase();s[f]=i[l]}for(l in e.attributes){var f=be[l]||l.toLowerCase();if(i[l]!==undefined){var p=a.accessors[e.attributes[l]];var c=Ae[p.componentType];u[f]=c;o[f]=p.normalized===true}}return r.getDependency("bufferView",t).then(function(e){return new Promise(function(t){n.decodeDracoFile(e,function(e){for(var r in e.attributes){var a=e.attributes[r];var n=o[r];if(n!==undefined)a.normalized=n}t(e)},s,u)})})};function ye(){this.name=ce.KHR_TEXTURE_TRANSFORM}ye.prototype.extendTexture=function(e,r){e=e.clone();if(r.offset!==undefined){e.offset.fromArray(r.offset)}if(r.rotation!==undefined){e.rotation=r.rotation}if(r.scale!==undefined){e.repeat.fromArray(r.scale)}if(r.texCoord!==undefined){console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.')}e.needsUpdate=true;return e};function Le(){return{name:ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return $},extendParams:function(e,r,a){var n=r.extensions[this.name];var t=J["standard"];var i=te.clone(t.uniforms);var s=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n");var o=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n");var u=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n");var l=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n");var f=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n");var p=t.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",s).replace("#include <metalnessmap_pars_fragment>",o).replace("#include <roughnessmap_fragment>",u).replace("#include <metalnessmap_fragment>",l).replace("#include <lights_physical_fragment>",f);delete i.roughness;delete i.metalness;delete i.roughnessMap;delete i.metalnessMap;i.specular={value:(new h).setHex(1118481)};i.glossiness={value:.5};i.specularMap={value:null};i.glossinessMap={value:null};e.vertexShader=t.vertexShader;e.fragmentShader=p;e.uniforms=i;e.defines={STANDARD:""};e.color=new h(1,1,1);e.opacity=1;var c=[];if(Array.isArray(n.diffuseFactor)){var d=n.diffuseFactor;e.color.fromArray(d);e.opacity=d[3]}if(n.diffuseTexture!==undefined){c.push(a.assignTexture(e,"map",n.diffuseTexture))}e.emissive=new h(0,0,0);e.glossiness=n.glossinessFactor!==undefined?n.glossinessFactor:1;e.specular=new h(1,1,1);if(Array.isArray(n.specularFactor)){e.specular.fromArray(n.specularFactor)}if(n.specularGlossinessTexture!==undefined){var v=n.specularGlossinessTexture;c.push(a.assignTexture(e,"glossinessMap",v));c.push(a.assignTexture(e,"specularMap",v))}return Promise.all(c)},createMaterial:function(e){var r=new $({defines:e.defines,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,fog:true,lights:true,opacity:e.opacity,transparent:e.transparent});r.isGLTFSpecularGlossinessMaterial=true;r.color=e.color;r.map=e.map===undefined?null:e.map;r.lightMap=null;r.lightMapIntensity=1;r.aoMap=e.aoMap===undefined?null:e.aoMap;r.aoMapIntensity=1;r.emissive=e.emissive;r.emissiveIntensity=1;r.emissiveMap=e.emissiveMap===undefined?null:e.emissiveMap;r.bumpMap=e.bumpMap===undefined?null:e.bumpMap;r.bumpScale=1;r.normalMap=e.normalMap===undefined?null:e.normalMap;if(e.normalScale)r.normalScale=e.normalScale;r.displacementMap=null;r.displacementScale=1;r.displacementBias=0;r.specularMap=e.specularMap===undefined?null:e.specularMap;r.specular=e.specular;r.glossinessMap=e.glossinessMap===undefined?null:e.glossinessMap;r.glossiness=e.glossiness;r.alphaMap=null;r.envMap=e.envMap===undefined?null:e.envMap;r.envMapIntensity=1;r.refractionRatio=.98;r.extensions.derivatives=true;return r},cloneMaterial:function(e){var r=e.clone();r.isGLTFSpecularGlossinessMaterial=true;var a=this.specularGlossinessParams;for(var n=0,t=a.length;n<t;n++){var i=e[a[n]];r[a[n]]=i&&i.isColor?i.clone():i}return r},refreshUniforms:function(e,r,a,n,t){if(t.isGLTFSpecularGlossinessMaterial!==true){return}var i=t.uniforms;var s=t.defines;i.opacity.value=t.opacity;i.diffuse.value.copy(t.color);i.emissive.value.copy(t.emissive).multiplyScalar(t.emissiveIntensity);i.map.value=t.map;i.specularMap.value=t.specularMap;i.alphaMap.value=t.alphaMap;i.lightMap.value=t.lightMap;i.lightMapIntensity.value=t.lightMapIntensity;i.aoMap.value=t.aoMap;i.aoMapIntensity.value=t.aoMapIntensity;var o;if(t.map){o=t.map}else if(t.specularMap){o=t.specularMap}else if(t.displacementMap){o=t.displacementMap}else if(t.normalMap){o=t.normalMap}else if(t.bumpMap){o=t.bumpMap}else if(t.glossinessMap){o=t.glossinessMap}else if(t.alphaMap){o=t.alphaMap}else if(t.emissiveMap){o=t.emissiveMap}if(o!==undefined){if(o.isWebGLRenderTarget){o=o.texture}if(o.matrixAutoUpdate===true){o.updateMatrix()}i.uvTransform.value.copy(o.matrix)}if(t.envMap){i.envMap.value=t.envMap;i.envMapIntensity.value=t.envMapIntensity;i.flipEnvMap.value=t.envMap.isCubeTexture?-1:1;i.reflectivity.value=t.reflectivity;i.refractionRatio.value=t.refractionRatio;i.maxMipLevel.value=e.properties.get(t.envMap).__maxMipLevel}i.specular.value.copy(t.specular);i.glossiness.value=t.glossiness;i.glossinessMap.value=t.glossinessMap;i.emissiveMap.value=t.emissiveMap;i.bumpMap.value=t.bumpMap;i.normalMap.value=t.normalMap;i.displacementMap.value=t.displacementMap;i.displacementScale.value=t.displacementScale;i.displacementBias.value=t.displacementBias;if(i.glossinessMap.value!==null&&s.USE_GLOSSINESSMAP===undefined){s.USE_GLOSSINESSMAP="";s.USE_ROUGHNESSMAP=""}if(i.glossinessMap.value===null&&s.USE_GLOSSINESSMAP!==undefined){delete s.USE_GLOSSINESSMAP;delete s.USE_ROUGHNESSMAP}}}}function Re(e,r,a,n){t.call(this,e,r,a,n)}Re.prototype=Object.create(t.prototype);Re.prototype.constructor=Re;Re.prototype.copySampleValue_=function(e){var r=this.resultBuffer,a=this.sampleValues,n=this.valueSize,t=e*n*3+n;for(var i=0;i!==n;i++){r[i]=a[t+i]}return r};Re.prototype.beforeStart_=Re.prototype.copySampleValue_;Re.prototype.afterEnd_=Re.prototype.copySampleValue_;Re.prototype.interpolate_=function(e,r,a,n){var t=this.resultBuffer;var i=this.sampleValues;var s=this.valueSize;var o=s*2;var u=s*3;var l=n-r;var f=(a-r)/l;var p=f*f;var c=p*f;var d=e*u;var v=d-u;var h=-2*c+3*p;var m=c-p;var g=1-h;var T=m-p+f;for(var M=0;M!==s;M++){var S=i[v+M+s];var y=i[v+M+o]*l;var L=i[d+M+s];var R=i[d+M]*l;t[M]=g*S+T*y+h*L+m*R}return t};var Ee={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123};var Ae={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array};var _e={9728:F,9729:d,9984:G,9985:o,9986:O,9987:y};var we={33071:r,33648:p,10497:W};var xe={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16};var be={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"};var Ie={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"};var Pe={CUBICSPLINE:undefined,LINEAR:I,STEP:s};var Ne={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};var Ue={"image/png":z,"image/jpeg":Y};function Fe(e,r){if(typeof e!=="string"||e==="")return"";if(/^https?:\/\//i.test(r)&&/^\//.test(e)){r=r.replace(/(^https?:\/\/[^\/]+).*/i,"$1")}if(/^(https?:)?\/\//i.test(e))return e;if(/^data:.*,.*$/i.test(e))return e;if(/^blob:.*$/i.test(e))return e;return r+e}var Oe;function Ge(){Oe=Oe||new U({color:16777215,emissive:0,metalness:1,roughness:1,transparent:false,depthTest:true,side:n});return Oe}function Ce(e,r,a){for(var n in a.extensions){if(e[n]===undefined){r.userData.gltfExtensions=r.userData.gltfExtensions||{};r.userData.gltfExtensions[n]=a.extensions[n]}}}function De(e,r){if(r.extras!==undefined){if(typeof r.extras==="object"){Object.assign(e.userData,r.extras)}else{console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+r.extras)}}}function He(d,v,e){var h=false;var m=false;for(var r=0,a=v.length;r<a;r++){var n=v[r];if(n.POSITION!==undefined)h=true;if(n.NORMAL!==undefined)m=true;if(h&&m)break}if(!h&&!m)return Promise.resolve(d);var t=[];var i=[];for(var r=0,a=v.length;r<a;r++){var n=v[r];if(h){var s=n.POSITION!==undefined?e.getDependency("accessor",n.POSITION):d.attributes.position;t.push(s)}if(m){var s=n.NORMAL!==undefined?e.getDependency("accessor",n.NORMAL):d.attributes.normal;i.push(s)}}return Promise.all([Promise.all(t),Promise.all(i)]).then(function(e){var r=e[0];var a=e[1];for(var n=0,t=r.length;n<t;n++){if(d.attributes.position===r[n])continue;r[n]=je(r[n])}for(var n=0,t=a.length;n<t;n++){if(d.attributes.normal===a[n])continue;a[n]=je(a[n])}for(var n=0,t=v.length;n<t;n++){var i=v[n];var s="morphTarget"+n;if(h){if(i.POSITION!==undefined){var o=r[n];o.name=s;var u=d.attributes.position;for(var l=0,f=o.count;l<f;l++){o.setXYZ(l,o.getX(l)+u.getX(l),o.getY(l)+u.getY(l),o.getZ(l)+u.getZ(l))}}}if(m){if(i.NORMAL!==undefined){var p=a[n];p.name=s;var c=d.attributes.normal;for(var l=0,f=p.count;l<f;l++){p.setXYZ(l,p.getX(l)+c.getX(l),p.getY(l)+c.getY(l),p.getZ(l)+c.getZ(l))}}}}if(h)d.morphAttributes.position=r;if(m)d.morphAttributes.normal=a;return d})}function Be(e,r){e.updateMorphTargets();if(r.weights!==undefined){for(var a=0,n=r.weights.length;a<n;a++){e.morphTargetInfluences[a]=r.weights[a]}}if(r.extras&&Array.isArray(r.extras.targetNames)){var t=r.extras.targetNames;if(e.morphTargetInfluences.length===t.length){e.morphTargetDictionary={};for(var a=0,n=t.length;a<n;a++){e.morphTargetDictionary[t[a]]=a}}else{console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}}function ke(e){var r=e.extensions&&e.extensions[ce.KHR_DRACO_MESH_COMPRESSION];var a;if(r){a="draco:"+r.bufferView+":"+r.indices+":"+Ke(r.attributes)}else{a=e.indices+":"+Ke(e.attributes)+":"+e.mode}return a}function Ke(e){var r="";var a=Object.keys(e).sort();for(var n=0,t=a.length;n<t;n++){r+=a[n]+":"+e[a[n]]+";"}return r}function je(e){if(e.isInterleavedBufferAttribute){var r=e.count;var a=e.itemSize;var n=e.array.slice(0,r*a);for(var t=0,i=0;t<r;++t){n[i++]=e.getX(t);if(a>=2)n[i++]=e.getY(t);if(a>=3)n[i++]=e.getZ(t);if(a>=4)n[i++]=e.getW(t)}return new _(n,a,e.normalized)}return e.clone()}function Ve(e,r,a){this.json=e||{};this.extensions=r||{};this.options=a||{};this.cache=new pe;this.primitiveCache={};this.textureLoader=new re(this.options.manager);this.textureLoader.setCrossOrigin(this.options.crossOrigin);this.fileLoader=new u(this.options.manager);this.fileLoader.setResponseType("arraybuffer");if(this.options.crossOrigin==="use-credentials"){this.fileLoader.setWithCredentials(true)}}Ve.prototype.parse=function(a,e){var n=this;var t=this.json;var i=this.extensions;this.cache.removeAll();this.markDefs();Promise.all([this.getDependencies("scene"),this.getDependencies("animation"),this.getDependencies("camera")]).then(function(e){var r={scene:e[0][t.scene||0],scenes:e[0],animations:e[1],cameras:e[2],asset:t.asset,parser:n,userData:{}};Ce(i,r,t);De(r,t);a(r)}).catch(e)};Ve.prototype.markDefs=function(){var e=this.json.nodes||[];var r=this.json.skins||[];var a=this.json.meshes||[];var n={};var t={};for(var i=0,s=r.length;i<s;i++){var o=r[i].joints;for(var u=0,l=o.length;u<l;u++){e[o[u]].isBone=true}}for(var f=0,p=e.length;f<p;f++){var c=e[f];if(c.mesh!==undefined){if(n[c.mesh]===undefined){n[c.mesh]=t[c.mesh]=0}n[c.mesh]++;if(c.skin!==undefined){a[c.mesh].isSkinnedMesh=true}}}this.json.meshReferences=n;this.json.meshUses=t};Ve.prototype.getDependency=function(e,r){var a=e+":"+r;var n=this.cache.get(a);if(!n){switch(e){case"scene":n=this.loadScene(r);break;case"node":n=this.loadNode(r);break;case"mesh":n=this.loadMesh(r);break;case"accessor":n=this.loadAccessor(r);break;case"bufferView":n=this.loadBufferView(r);break;case"buffer":n=this.loadBuffer(r);break;case"material":n=this.loadMaterial(r);break;case"texture":n=this.loadTexture(r);break;case"skin":n=this.loadSkin(r);break;case"animation":n=this.loadAnimation(r);break;case"camera":n=this.loadCamera(r);break;case"light":n=this.extensions[ce.KHR_LIGHTS_PUNCTUAL].loadLight(r);break;default:throw new Error("Unknown type: "+e)}this.cache.add(a,n)}return n};Ve.prototype.getDependencies=function(a){var e=this.cache.get(a);if(!e){var n=this;var r=this.json[a+(a==="mesh"?"es":"s")]||[];e=Promise.all(r.map(function(e,r){return n.getDependency(a,r)}));this.cache.add(a,e)}return e};Ve.prototype.loadBuffer=function(e){var a=this.json.buffers[e];var n=this.fileLoader;if(a.type&&a.type!=="arraybuffer"){throw new Error("THREE.GLTFLoader: "+a.type+" buffer type is not supported.")}if(a.uri===undefined&&e===0){return Promise.resolve(this.extensions[ce.KHR_BINARY_GLTF].body)}var t=this.options;return new Promise(function(e,r){n.load(Fe(a.uri,t.path),e,undefined,function(){r(new Error('THREE.GLTFLoader: Failed to load buffer "'+a.uri+'".'))})})};Ve.prototype.loadBufferView=function(e){var n=this.json.bufferViews[e];return this.getDependency("buffer",n.buffer).then(function(e){var r=n.byteLength||0;var a=n.byteOffset||0;return e.slice(a,a+r)})};Ve.prototype.loadAccessor=function(e){var R=this;var E=this.json;var A=this.json.accessors[e];if(A.bufferView===undefined&&A.sparse===undefined){return Promise.resolve(null)}var r=[];if(A.bufferView!==undefined){r.push(this.getDependency("bufferView",A.bufferView))}else{r.push(null)}if(A.sparse!==undefined){r.push(this.getDependency("bufferView",A.sparse.indices.bufferView));r.push(this.getDependency("bufferView",A.sparse.values.bufferView))}return Promise.all(r).then(function(e){var r=e[0];var a=xe[A.type];var n=Ae[A.componentType];var t=n.BYTES_PER_ELEMENT;var i=t*a;var s=A.byteOffset||0;var o=A.bufferView!==undefined?E.bufferViews[A.bufferView].byteStride:undefined;var u=A.normalized===true;var l,f;if(o&&o!==i){var p=Math.floor(s/o);var c="InterleavedBuffer:"+A.bufferView+":"+A.componentType+":"+p+":"+A.count;var d=R.cache.get(c);if(!d){l=new n(r,p*o,A.count*o/t);d=new x(l,o/t);R.cache.add(c,d)}f=new b(d,a,s%o/t,u)}else{if(r===null){l=new n(A.count*a)}else{l=new n(r,s,A.count*a)}f=new _(l,a,u)}if(A.sparse!==undefined){var v=xe.SCALAR;var h=Ae[A.sparse.indices.componentType];var m=A.sparse.indices.byteOffset||0;var g=A.sparse.values.byteOffset||0;var T=new h(e[1],m,A.sparse.count*v);var M=new n(e[2],g,A.sparse.count*a);if(r!==null){f.setArray(f.array.slice())}for(var S=0,y=T.length;S<y;S++){var L=T[S];f.setX(L,M[S*a]);if(a>=2)f.setY(L,M[S*a+1]);if(a>=3)f.setZ(L,M[S*a+2]);if(a>=4)f.setW(L,M[S*a+3]);if(a>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return f})};Ve.prototype.loadTexture=function(e){var r=this;var n=this.json;var t=this.options;var i=this.textureLoader;var s=le.URL||le.webkitURL;var o=n.textures[e];var u=o.extensions||{};var l;if(u[ce.MSFT_TEXTURE_DDS]){l=n.images[u[ce.MSFT_TEXTURE_DDS].source]}else{l=n.images[o.source]}var f=l.uri;var p=false;if(l.bufferView!==undefined){f=r.getDependency("bufferView",l.bufferView).then(function(e){if(le.arrayBufferToBase64!=undefined){var r=le.arrayBufferToBase64(e);var a=`data:${l.mimeType};base64,${r}`;return a}p=true;var n=new Blob([e],{type:l.mimeType});f=s.createObjectURL(n);return f})}return Promise.resolve(f).then(function(a){var n=L.Handlers.get(a);if(!n){n=u[ce.MSFT_TEXTURE_DDS]?r.extensions[ce.MSFT_TEXTURE_DDS].ddsLoader:i}return new Promise(function(e,r){n.load(Fe(a,t.path),e,undefined,r)})}).then(function(e){if(le.arrayBufferToBase64==undefined){if(p===true){s.revokeObjectURL(f)}}e.flipY=false;if(o.name!==undefined)e.name=o.name;if(l.mimeType in Ue){e.format=Ue[l.mimeType]}var r=n.samplers||{};var a=r[o.sampler]||{};e.magFilter=_e[a.magFilter]||d;e.minFilter=_e[a.minFilter]||y;e.wrapS=we[a.wrapS]||W;e.wrapT=we[a.wrapT]||W;return e})};Ve.prototype.assignTexture=function(a,n,t){var i=this;return this.getDependency("texture",t.index).then(function(e){if(!e.isCompressedTexture){switch(n){case"aoMap":case"emissiveMap":case"metalnessMap":case"normalMap":case"roughnessMap":e.format=Y;break}}if(i.extensions[ce.KHR_TEXTURE_TRANSFORM]){var r=t.extensions!==undefined?t.extensions[ce.KHR_TEXTURE_TRANSFORM]:undefined;if(r){e=i.extensions[ce.KHR_TEXTURE_TRANSFORM].extendTexture(e,r)}}a[n]=e})};Ve.prototype.assignFinalMaterial=function(e){var r=e.geometry;var a=e.material;var n=this.extensions;var t=r.attributes.tangent!==undefined;var i=r.attributes.color!==undefined;var s=r.attributes.normal===undefined;var o=e.isSkinnedMesh===true;var u=Object.keys(r.morphAttributes).length>0;var l=u&&r.morphAttributes.normal!==undefined;if(e.isPoints){var f="PointsMaterial:"+a.uuid;var p=this.cache.get(f);if(!p){p=new j;E.prototype.copy.call(p,a);p.color.copy(a.color);p.map=a.map;p.lights=false;p.sizeAttenuation=false;this.cache.add(f,p)}a=p}else if(e.isLine){var f="LineBasicMaterial:"+a.uuid;var c=this.cache.get(f);if(!c){c=new T;E.prototype.copy.call(c,a);c.color.copy(a.color);c.lights=false;this.cache.add(f,c)}a=c}if(t||i||s||o||u){var f="ClonedMaterial:"+a.uuid+":";if(a.isGLTFSpecularGlossinessMaterial)f+="specular-glossiness:";if(o)f+="skinning:";if(t)f+="vertex-tangents:";if(i)f+="vertex-colors:";if(s)f+="flat-shading:";if(u)f+="morph-targets:";if(l)f+="morph-normals:";var d=this.cache.get(f);if(!d){d=a.isGLTFSpecularGlossinessMaterial?n[ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(a):a.clone();if(o)d.skinning=true;if(t)d.vertexTangents=true;if(i)d.vertexColors=oe;if(s)d.flatShading=true;if(u)d.morphTargets=true;if(l)d.morphNormals=true;this.cache.add(f,d)}a=d}if(a.aoMap&&r.attributes.uv2===undefined&&r.attributes.uv!==undefined){console.log("THREE.GLTFLoader: Duplicating UVs to support aoMap.");r.addAttribute("uv2",new _(r.attributes.uv.array,2))}if(a.isGLTFSpecularGlossinessMaterial){e.onBeforeRender=n[ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms}e.material=a};Ve.prototype.loadMaterial=function(e){var r=this;var a=this.json;var n=this.extensions;var t=a.materials[e];var i;var s={};var o=t.extensions||{};var u=[];if(o[ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var l=n[ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];i=l.getMaterialType();u.push(l.extendParams(s,t,r))}else if(o[ce.KHR_MATERIALS_UNLIT]){var f=n[ce.KHR_MATERIALS_UNLIT];i=f.getMaterialType();u.push(f.extendParams(s,t,r))}else{i=U;var p=t.pbrMetallicRoughness||{};s.color=new h(1,1,1);s.opacity=1;if(Array.isArray(p.baseColorFactor)){var c=p.baseColorFactor;s.color.fromArray(c);s.opacity=c[3]}if(p.baseColorTexture!==undefined){u.push(r.assignTexture(s,"map",p.baseColorTexture))}s.metalness=p.metallicFactor!==undefined?p.metallicFactor:1;s.roughness=p.roughnessFactor!==undefined?p.roughnessFactor:1;if(p.metallicRoughnessTexture!==undefined){u.push(r.assignTexture(s,"metalnessMap",p.metallicRoughnessTexture));u.push(r.assignTexture(s,"roughnessMap",p.metallicRoughnessTexture))}}if(t.doubleSided===true){s.side=v}var d=t.alphaMode||Ne.OPAQUE;if(d===Ne.BLEND){s.transparent=true}else{s.transparent=false;if(d===Ne.MASK){s.alphaTest=t.alphaCutoff!==undefined?t.alphaCutoff:.5}}if(t.normalTexture!==undefined&&i!==N){u.push(r.assignTexture(s,"normalMap",t.normalTexture));s.normalScale=new ie(1,1);if(t.normalTexture.scale!==undefined){s.normalScale.set(t.normalTexture.scale,t.normalTexture.scale)}}if(t.occlusionTexture!==undefined&&i!==N){u.push(r.assignTexture(s,"aoMap",t.occlusionTexture));if(t.occlusionTexture.strength!==undefined){s.aoMapIntensity=t.occlusionTexture.strength}}if(t.emissiveFactor!==undefined&&i!==N){s.emissive=(new h).fromArray(t.emissiveFactor)}if(t.emissiveTexture!==undefined&&i!==N){u.push(r.assignTexture(s,"emissiveMap",t.emissiveTexture))}return Promise.all(u).then(function(){var e;if(i===$){e=n[ce.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(s)}else{e=new i(s)}if(t.name!==undefined)e.name=t.name;if(e.map)e.map.encoding=ue;if(e.emissiveMap)e.emissiveMap.encoding=ue;if(e.specularMap)e.specularMap.encoding=ue;De(e,t);if(t.extensions)Ce(n,e,t);return e})};function Xe(a,e,n){var r=e.attributes;var t=[];function i(e,r){return n.getDependency("accessor",e).then(function(e){a.addAttribute(r,e)})}for(var s in r){var o=be[s]||s.toLowerCase();if(o in a.attributes)continue;t.push(i(r[s],o))}if(e.indices!==undefined&&!a.index){var u=n.getDependency("accessor",e.indices).then(function(e){a.setIndex(e)});t.push(u)}De(a,e);return Promise.all(t).then(function(){return e.targets!==undefined?He(a,e.targets,n):a})}Ve.prototype.loadGeometries=function(e){var a=this;var n=this.extensions;var r=this.primitiveCache;function t(r){return n[ce.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(r,a).then(function(e){return Xe(e,r,a)})}var i=[];for(var s=0,o=e.length;s<o;s++){var u=e[s];var l=ke(u);var f=r[l];if(f){i.push(f.promise)}else{var p;if(u.extensions&&u.extensions[ce.KHR_DRACO_MESH_COMPRESSION]){p=t(u)}else{p=Xe(new c,u,a)}r[l]={primitive:u,promise:p};i.push(p)}}return Promise.all(i)};Ve.prototype.loadMesh=function(f){var p=this;var e=this.json;var c=e.meshes[f];var d=c.primitives;var r=[];for(var a=0,n=d.length;a<n;a++){var t=d[a].material===undefined?Ge():this.getDependency("material",d[a].material);r.push(t)}return Promise.all(r).then(function(l){return p.loadGeometries(d).then(function(e){var r=[];for(var a=0,n=e.length;a<n;a++){var t=e[a];var i=d[a];var s;var o=l[a];if(i.mode===Ee.TRIANGLES||i.mode===Ee.TRIANGLE_STRIP||i.mode===Ee.TRIANGLE_FAN||i.mode===undefined){s=c.isSkinnedMesh===true?new q(t,o):new P(t,o);if(s.isSkinnedMesh===true&&!s.geometry.attributes.skinWeight.normalized){s.normalizeSkinWeights()}if(i.mode===Ee.TRIANGLE_STRIP){s.drawMode=ne}else if(i.mode===Ee.TRIANGLE_FAN){s.drawMode=ae}}else if(i.mode===Ee.LINES){s=new S(t,o)}else if(i.mode===Ee.LINE_STRIP){s=new g(t,o)}else if(i.mode===Ee.LINE_LOOP){s=new M(t,o)}else if(i.mode===Ee.POINTS){s=new K(t,o)}else{throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+i.mode)}if(Object.keys(s.geometry.morphAttributes).length>0){Be(s,c)}s.name=c.name||"mesh_"+f;if(e.length>1)s.name+="_"+a;De(s,c);p.assignFinalMaterial(s);r.push(s)}if(r.length===1){return r[0]}var u=new m;for(var a=0,n=r.length;a<n;a++){u.add(r[a])}return u})})};Ve.prototype.loadCamera=function(e){var r;var a=this.json.cameras[e];var n=a[a.type];if(!n){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}if(a.type==="perspective"){r=new B(f.radToDeg(n.yfov),n.aspectRatio||1,n.znear||1,n.zfar||2e6)}else if(a.type==="orthographic"){r=new H(n.xmag/-2,n.xmag/2,n.ymag/2,n.ymag/-2,n.znear,n.zfar)}if(a.name!==undefined)r.name=a.name;De(r,a);return Promise.resolve(r)};Ve.prototype.loadSkin=function(e){var r=this.json.skins[e];var a={joints:r.joints};if(r.inverseBindMatrices===undefined){return Promise.resolve(a)}return this.getDependency("accessor",r.inverseBindMatrices).then(function(e){a.inverseBindMatrices=e;return a})};Ve.prototype.loadAnimation=function(A){var e=this.json;var _=e.animations[A];var r=[];var a=[];var n=[];var t=[];var i=[];for(var s=0,o=_.channels.length;s<o;s++){var u=_.channels[s];var l=_.samplers[u.sampler];var f=u.target;var p=f.node!==undefined?f.node:f.id;var c=_.parameters!==undefined?_.parameters[l.input]:l.input;var d=_.parameters!==undefined?_.parameters[l.output]:l.output;r.push(this.getDependency("node",p));a.push(this.getDependency("accessor",c));n.push(this.getDependency("accessor",d));t.push(l);i.push(f)}return Promise.all([Promise.all(r),Promise.all(a),Promise.all(n),Promise.all(t),Promise.all(i)]).then(function(e){var r=e[0];var a=e[1];var n=e[2];var t=e[3];var i=e[4];var s=[];for(var o=0,u=r.length;o<u;o++){var l=r[o];var f=a[o];var p=n[o];var c=t[o];var d=i[o];if(l===undefined)continue;l.updateMatrix();l.matrixAutoUpdate=true;var v;switch(Ie[d.path]){case Ie.weights:v=C;break;case Ie.rotation:v=X;break;case Ie.position:case Ie.scale:default:v=se;break}var h=l.name?l.name:l.uuid;var m=c.interpolation!==undefined?Pe[c.interpolation]:I;var g=[];if(Ie[d.path]===Ie.weights){l.traverse(function(e){if(e.isMesh===true&&e.morphTargetInfluences){g.push(e.name?e.name:e.uuid)}})}else{g.push(h)}var T=p.array;if(p.normalized){var M;if(T.constructor===Int8Array){M=1/127}else if(T.constructor===Uint8Array){M=1/255}else if(T.constructor==Int16Array){M=1/32767}else if(T.constructor===Uint16Array){M=1/65535}else{throw new Error("THREE.GLTFLoader: Unsupported output accessor component type.")}var S=new Float32Array(T.length);for(var y=0,L=T.length;y<L;y++){S[y]=T[y]*M}T=S}for(var y=0,L=g.length;y<L;y++){var R=new v(g[y]+"."+Ie[d.path],f.array,T,m);if(c.interpolation==="CUBICSPLINE"){R.createInterpolant=function e(r){return new Re(this.times,this.values,this.getValueSize()/3,r)};R.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=true}s.push(R)}}var E=_.name!==undefined?_.name:"animation_"+A;return new w(E,undefined,s)})};Ve.prototype.loadNode=function(e){var r=this.json;var i=this.extensions;var a=this;var s=r.meshReferences;var o=r.meshUses;var u=r.nodes[e];return function(){var e=[];if(u.mesh!==undefined){e.push(a.getDependency("mesh",u.mesh).then(function(e){var r;if(s[u.mesh]>1){var a=o[u.mesh]++;r=e.clone();r.name+="_instance_"+a;r.onBeforeRender=e.onBeforeRender;for(var n=0,t=r.children.length;n<t;n++){r.children[n].name+="_instance_"+a;r.children[n].onBeforeRender=e.children[n].onBeforeRender}}else{r=e}if(u.weights!==undefined){r.traverse(function(e){if(!e.isMesh)return;for(var r=0,a=u.weights.length;r<a;r++){e.morphTargetInfluences[r]=u.weights[r]}})}return r}))}if(u.camera!==undefined){e.push(a.getDependency("camera",u.camera))}if(u.extensions&&u.extensions[ce.KHR_LIGHTS_PUNCTUAL]&&u.extensions[ce.KHR_LIGHTS_PUNCTUAL].light!==undefined){e.push(a.getDependency("light",u.extensions[ce.KHR_LIGHTS_PUNCTUAL].light))}return Promise.all(e)}().then(function(e){var r;if(u.isBone===true){r=new l}else if(e.length>1){r=new m}else if(e.length===1){r=e[0]}else{r=new D}if(r!==e[0]){for(var a=0,n=e.length;a<n;a++){r.add(e[a])}}if(u.name!==undefined){r.userData.name=u.name;r.name=V.sanitizeNodeName(u.name)}De(r,u);if(u.extensions)Ce(i,r,u);if(u.matrix!==undefined){var t=new A;t.fromArray(u.matrix);r.applyMatrix(t)}else{if(u.translation!==undefined){r.position.fromArray(u.translation)}if(u.rotation!==undefined){r.quaternion.fromArray(u.rotation)}if(u.scale!==undefined){r.scale.fromArray(u.scale)}}return r})};Ve.prototype.loadScene=function(){function p(e,s,o,l){var f=o.nodes[e];return l.getDependency("node",e).then(function(e){if(f.skin===undefined)return e;var u;return l.getDependency("skin",f.skin).then(function(e){u=e;var r=[];for(var a=0,n=u.joints.length;a<n;a++){r.push(l.getDependency("node",u.joints[a]))}return Promise.all(r)}).then(function(o){e.traverse(function(e){if(!e.isMesh)return;var r=[];var a=[];for(var n=0,t=o.length;n<t;n++){var i=o[n];if(i){r.push(i);var s=new A;if(u.inverseBindMatrices!==undefined){s.fromArray(u.inverseBindMatrices.array,n*16)}a.push(s)}else{console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',u.joints[n])}}e.bind(new Q(r,a),e.matrixWorld)});return e})}).then(function(e){s.add(e);var r=[];if(f.children){var a=f.children;for(var n=0,t=a.length;n<t;n++){var i=a[n];r.push(p(i,e,o,l))}}return Promise.all(r)})}return function e(r){var a=this.json;var n=this.extensions;var t=this.json.scenes[r];var i=this;var s=new Z;if(t.name!==undefined)s.name=t.name;De(s,t);if(t.extensions)Ce(n,s,t);var o=t.nodes||[];var u=[];for(var l=0,f=o.length;l<f;l++){u.push(p(o[l],s,a,i))}return Promise.all(u).then(function(){return s})}}();return fe}