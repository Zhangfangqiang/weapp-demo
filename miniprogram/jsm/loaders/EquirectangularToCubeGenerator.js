export default function(e){let{BackSide:c,BoxBufferGeometry:l,CubeCamera:m,Mesh:d,NoBlending:v,PerspectiveCamera:r,Scene:p,ShaderMaterial:g,UniformsUtils:f,WebGLRenderTargetCube:n}=e;var t=function(e){this.renderer=e};t.prototype.fromEquirectangular=function(e,t){t=t||{};var r=new p;var n={uniforms:{tEquirect:{value:null}},vertexShader:`
			varying vec3 vWorldDirection;

			//include <common>
			vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

				return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

			}

			void main() {

				vWorldDirection = transformDirection( position, modelMatrix );

				#include <begin_vertex>
				#include <project_vertex>

			}
			`,fragmentShader:`
			uniform sampler2D tEquirect;

			varying vec3 vWorldDirection;

			//include <common>
			#define RECIPROCAL_PI 0.31830988618
			#define RECIPROCAL_PI2 0.15915494

			void main() {

				vec3 direction = normalize( vWorldDirection );

				vec2 sampleUV;

				sampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

				sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;

				gl_FragColor = texture2D( tEquirect, sampleUV );

			}
			`};var i=new g({type:"CubemapFromEquirect",uniforms:f.clone(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:c,blending:v});i.uniforms.tEquirect.value=e;var a=new d(new l(5,5,5),i);r.add(a);var o=t.resolution||512;var u={type:e.type,format:e.format,encoding:e.encoding,generateMipmaps:t.generateMipmaps!==undefined?t.generateMipmaps:e.generateMipmaps,minFilter:t.minFilter!==undefined?t.minFilter:e.minFilter,magFilter:t.magFilter!==undefined?t.magFilter:e.magFilter};var s=new m(1,10,o,u);s.update(this.renderer,r);a.geometry.dispose();a.material.dispose();return s.renderTarget};var i=function(){var i=new r(90,1,.1,10);var a=new p;var o=new d(new l(1,1,1),t());o.material.side=c;a.add(o);var e=function(e,t){t=t||{};this.sourceTexture=e;this.resolution=t.resolution||512;this.views=[{t:[1,0,0],u:[0,-1,0]},{t:[-1,0,0],u:[0,-1,0]},{t:[0,1,0],u:[0,0,1]},{t:[0,-1,0],u:[0,0,-1]},{t:[0,0,1],u:[0,-1,0]},{t:[0,0,-1],u:[0,-1,0]}];var r={format:t.format||this.sourceTexture.format,magFilter:this.sourceTexture.magFilter,minFilter:this.sourceTexture.minFilter,type:t.type||this.sourceTexture.type,generateMipmaps:this.sourceTexture.generateMipmaps,anisotropy:this.sourceTexture.anisotropy,encoding:this.sourceTexture.encoding};this.renderTarget=new n(this.resolution,this.resolution,r)};e.prototype={constructor:e,update:function(e){var t=e.getRenderTarget();o.material.uniforms.equirectangularMap.value=this.sourceTexture;for(var r=0;r<6;r++){var n=this.views[r];i.position.set(0,0,0);i.up.set(n.u[0],n.u[1],n.u[2]);i.lookAt(n.t[0],n.t[1],n.t[2]);e.setRenderTarget(this.renderTarget,r);e.clear();e.render(a,i)}e.setRenderTarget(t);return this.renderTarget.texture},dispose:function(){this.renderTarget.dispose()}};function t(){var e=new g({uniforms:{equirectangularMap:{value:null}},vertexShader:"varying vec3 localPosition;\n\t\t\t\t\n\t\t\t\tvoid main() {\n\t\t\t\t\tlocalPosition = position;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",fragmentShader:"#include <common>\n\t\t\t\tvarying vec3 localPosition;\n\t\t\t\tuniform sampler2D equirectangularMap;\n\t\t\t\t\n\t\t\t\tvec2 EquirectangularSampleUV(vec3 v) {\n\t\t\t\t\tvec2 uv = vec2(atan(v.z, v.x), asin(v.y));\n\t\t\t\t\tuv *= vec2(0.1591, 0.3183); // inverse atan\n\t\t\t\t\tuv += 0.5;\n\t\t\t\t\treturn uv;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 uv = EquirectangularSampleUV(normalize(localPosition));\n\t\t\t\t\tgl_FragColor = texture2D(equirectangularMap, uv);\n\t\t\t\t}",blending:v});e.type="EquirectangularToCubeGenerator";return e}return e}();return{CubemapGenerator:t,EquirectangularToCubeGenerator:i}}