/**
 * pocket.gl - A fully customizable webgl shader sandbox to embed in your pages - http://pocket.gl
 *
 * Copyright 2016 Giuseppe Portelli <giuseppe.portelli@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
 
require.onError = function (err) {
    console.log("Error [" + err.requireType + "]" + ' modules: ' + err.requireModules);
    throw err;
};

require.config({
    baseUrl: '..',

    paths: {
        app: 				'src/js',
        three_examples: 	'bower_components/threejs/examples/js',
        three_builds: 		'bower_components/threejs/build',
        text: 				'bower_components/text/text',
        ace_builds: 		'bower_components/ace-builds/src-noconflict',
        dat_gui:  			'src/external_libs',
        clipboard: 			'bower_components/clipboard/dist/clipboard.min'
    },

    shim: {
    	"three_examples/Detector": 							['three_builds/three'],
		"three_examples/controls/OrbitControls": 			['three_builds/three'],
		"three_examples/loaders/OBJLoader": 				['three_builds/three'],
		"three_examples/loaders/ColladaLoader": 			['three_builds/three'],
		"three_examples/geometries/TeapotBufferGeometry": 	['three_builds/three'],
    }
});

var index = parseInt(window.location.hash.substring(1));
if(isNaN(index)) index = 0;

require(["examples/examples"], function(examples) {
	require([
		"app/pocket.gl"
		],

		function(widget) {
			var menu = document.createElement("ol");
			menu.style.float = "left";
			for(i=0; i<examples.examples_list.length; i++) {
				var li = document.createElement("li"); 
				var a = document.createElement("a");
				a.innerHTML = i == index ? "[ " + examples.examples_list[i] + " ]" : examples.examples_list[i];
				a.href = "#" + i;
				a.style = "padding-right: 10px";
				a.onclick = function(index) { return function() { 
					window.location = "#" + index; 
					window.location.reload(); 
				}}(i);
				li.appendChild(a)
				menu.appendChild(li);			
			}
			document.getElementById("container").appendChild(menu);

			var widgetContainer = document.createElement("div");
			widgetContainer.style.marginLeft = "240px";
			document.getElementById("container").appendChild(widgetContainer);

		    new widget(widgetContainer, "data/" + examples.examples_list[index] + "/params.js"); 
		}
	);
});