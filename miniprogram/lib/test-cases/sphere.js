export function renderSphere(s,r){var e,t;var o,h,l;var p;var n=[],d=[];a();w();function a(){o=new r.PerspectiveCamera(45,s.width/s.height,1,2e3);o.position.set(0,200,800);h=new r.Scene;var e=new r.GridHelper(1e3,40,3158064,3158064);e.position.y=-75;h.add(e);d.push(new r.MeshLambertMaterial({color:14540253}));d.push(new r.MeshPhongMaterial({color:14540253,specular:39168,shininess:30,flatShading:true}));d.push(new r.MeshNormalMaterial);d.push(new r.MeshBasicMaterial({color:16755200,transparent:true,blending:r.AdditiveBlending}));d.push(new r.MeshLambertMaterial({color:14540253}));d.push(new r.MeshBasicMaterial({color:16755200,wireframe:true}));d.push(new r.MeshBasicMaterial({color:16755200,transparent:true,blending:r.AdditiveBlending}));d.push(new r.MeshNormalMaterial({flatShading:true}));d.push(new r.MeshBasicMaterial({color:16755200,wireframe:true}));d.push(new r.MeshDepthMaterial);d.push(new r.MeshLambertMaterial({color:6710886,emissive:16711680}));d.push(new r.MeshPhongMaterial({color:0,specular:6710886,emissive:16711680,shininess:10,opacity:.9,transparent:true}));d.push(new r.MeshPhongMaterial({color:0,specular:6710886,emissive:16711680,shininess:10,opacity:.9,transparent:true}));var t=new r.SphereBufferGeometry(70,32,16);for(var a=0,i=d.length;a<i;a++){M(t,d[a])}h.add(new r.AmbientLight(1118481));var n=new r.DirectionalLight(16777215,.125);n.position.x=Math.random()-.5;n.position.y=Math.random()-.5;n.position.z=Math.random()-.5;n.position.normalize();h.add(n);p=new r.PointLight(16777215,1);h.add(p);p.add(new r.Mesh(new r.SphereBufferGeometry(4,8,8),new r.MeshBasicMaterial({color:16777215})));l=new r.WebGLRenderer({antialias:true,alpha:true});l.setPixelRatio(wx.getSystemInfoSync().pixelRatio);l.setSize(s.width,s.height)}function M(e,t){var a=new r.Mesh(e,t);a.position.x=n.length%4*200-400;a.position.z=Math.floor(n.length/4)*200-200;a.rotation.x=Math.random()*200-100;a.rotation.y=Math.random()*200-100;a.rotation.z=Math.random()*200-100;n.push(a);h.add(a)}function i(){o.aspect=window.innerWidth/window.innerHeight;o.updateProjectionMatrix();l.setSize(window.innerWidth,window.innerHeight)}function u(){s.width=256;s.height=256;var e=s.getContext("2d");var t=e.getImageData(0,0,256,256);var a=0,i=0;for(var n=0,r=0,o=t.data.length;n<o;n+=4,r++){a=r%256;i=a==0?i+1:i;t.data[n]=255;t.data[n+1]=255;t.data[n+2]=255;t.data[n+3]=Math.floor(a^i)}e.putImageData(t,0,0);return s}function w(){c();s.requestAnimationFrame(w)}function c(){var e=5e-4*Date.now();o.position.x=Math.cos(e)*1e3;o.position.z=Math.sin(e)*1e3;o.lookAt(h.position);for(var t=0,a=n.length;t<a;t++){var i=n[t];i.rotation.x+=.01;i.rotation.y+=.005}p.position.x=Math.sin(e*7)*300;p.position.y=Math.cos(e*5)*400;p.position.z=Math.cos(e*3)*300;l.render(h,o)}}