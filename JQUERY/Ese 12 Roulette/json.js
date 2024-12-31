let json = [
	// 1° riga
	{ id:0, numbers:[0], win:36, color:"green", value:0},    
	{ id:1, numbers:[3], win:36, color:"red", value:3},  
	{ id:2, numbers:[6], win:36, color:"black", value:6},   
	{ id:3, numbers:[9], win:36, color:"red", value:9},   
	{ id:4, numbers:[12], win:36, color:"red", value:12},   
	{ id:5, numbers:[15], win:36, color:"black", value:15},   
	{ id:6, numbers:[18], win:36, color:"red", value:18},   
	{ id:7, numbers:[21], win:36, color:"red", value:21},   
	{ id:8, numbers:[24], win:36, color:"black", value:24},   
	{ id:9, numbers:[27], win:36, color:"red", value:27},   
	{ id:10, numbers:[30], win:36, color:"red", value:30},   
	{ id:11, numbers:[33], win:36, color:"black", value:33},   
	{ id:12, numbers:[36], win:36, color:"red", value:36},   
	{ id:13, numbers:[3,6,9,12,15,18,21,24,27,30,33,36], win:3, value:-1},   

	// 2° riga
	{ id:14, numbers:[0], win:36, color:"green", value:0},   
	{ id:15, numbers:[2], win:36, color:"black", value:2},   
	{ id:16, numbers:[5], win:36, color:"red", value:5},   
	{ id:17, numbers:[8], win:36, color:"black", value:8},   
	{ id:18, numbers:[11], win:36, color:"black", value:11},   
	{ id:19, numbers:[14], win:36, color:"red", value:14},   
	{ id:20, numbers:[17], win:36, color:"black", value:17},   
	{ id:21, numbers:[20], win:36, color:"black", value:20},   
	{ id:22, numbers:[23], win:36, color:"red", value:23},   
	{ id:23, numbers:[26], win:36, color:"black", value:26},   
	{ id:24, numbers:[29], win:36, color:"black", value:29},   
	{ id:25, numbers:[32], win:36, color:"red", value:32},   
	{ id:26, numbers:[35], win:36, color:"black", value:35},   
	{ id:27, numbers:[2,5,8,11,14,17,20,23,26,29,32,35], win:3, value:-1},   
	
	// 3° riga
	{ id:28, numbers:[0], win:36, color:"green", value:0},   
	{ id:29, numbers:[1], win:36, color:"red", value:1},   
	{ id:30, numbers:[4], win:36, color:"black", value:4},   
	{ id:31, numbers:[7], win:36, color:"red", value:7},   
	{ id:32, numbers:[10], win:36, color:"black", value:10},   
	{ id:33, numbers:[13], win:36, color:"black", value:13},   
	{ id:34, numbers:[16], win:36, color:"red", value:16},   
	{ id:35, numbers:[19], win:36, color:"red", value:19},   
	{ id:36, numbers:[22], win:36, color:"black", value:22},   
	{ id:37, numbers:[25], win:36, color:"red", value:25},   
	{ id:38, numbers:[28], win:36, color:"black", value:28},   
	{ id:39, numbers:[31], win:36, color:"black", value:31},   
	{ id:40, numbers:[34], win:36, color:"red", value:34},   
	{ id:41, numbers:[1,4,7,10,13,16,19,22,25,28,31,34], win:3, value:-1},   
	
	// 4° riga		
	{ id:42, numbers:[], win:0, value:-1},   
	
	{ id:43, numbers:[1,2,3,4,5,6,7,8,9,10,11,12], win:3, value:-1},   
	{ id:44, numbers:[1,2,3,4,5,6,7,8,9,10,11,12], win:3, value:-1},   
	{ id:45, numbers:[1,2,3,4,5,6,7,8,9,10,11,12], win:3, value:-1},   
	{ id:46, numbers:[1,2,3,4,5,6,7,8,9,10,11,12], win:3, value:-1},   

	{ id:47, numbers:[13,14,15,16,17,18,19,20,21,22,23,24], win:3, value:-1},   
	{ id:48, numbers:[13,14,15,16,17,18,19,20,21,22,23,24], win:3, value:-1},   
	{ id:49, numbers:[13,14,15,16,17,18,19,20,21,22,23,24], win:3, value:-1},   
	{ id:50, numbers:[13,14,15,16,17,18,19,20,21,22,23,24], win:3, value:-1},   

	{ id:51, numbers:[25,26,27,28,29,30,31,32,33,34,35,36], win:3, value:-1},   
	{ id:52, numbers:[25,26,27,28,29,30,31,32,33,34,35,36], win:3, value:-1},   
	{ id:53, numbers:[25,26,27,28,29,30,31,32,33,34,35,36], win:3, value:-1},   
	{ id:54, numbers:[25,26,27,28,29,30,31,32,33,34,35,36], win:3, value:-1},   
	
	{ id:55, numbers:[], win:0, value:-1},   

	// 5° riga		
	{ id:56, numbers:[], win:0, value:-1},   
	
	{ id:57, numbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], win:2, value:-1},   
	{ id:58, numbers:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18], win:2, value:-1},   
	{ id:59, numbers:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36], win:2, value:-1},   
	{ id:60, numbers:[2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36], win:2, value:-1},   

	{ id:61, numbers:[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36], win:2, value:-1},   
	{ id:62, numbers:[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36], win:2, value:-1},   
	{ id:63, numbers:[2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35], win:2, value:-1},   
	{ id:64, numbers:[2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35], win:2, value:-1},   

	{ id:65, numbers:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35], win:2, value:-1},   
	{ id:66, numbers:[1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35], win:2, value:-1},   
	{ id:67, numbers:[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36], win:2, value:-1},   
	{ id:68, numbers:[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36], win:2, value:-1},   
	
	{ id:69, numbers:[], win:0, value:-1},   
]
