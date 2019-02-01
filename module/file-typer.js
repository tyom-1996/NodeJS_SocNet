class fileTyper {

					getType (type){

										if (type == '.jpg' || type == '.png'|| type == '.jpeg' || type == '.gif') {
															return 'image';
										}else if (type == '.mp4' || type == '.m4v'|| type == '.mov' || type == '.mpg' || type == '.peg'|| type == '.wmv'){
													return 'video'
										}else if (type == '.aiff' || type == '.au'|| type == '.mid' || type == '.midi' || type == '.mp3' || type == '.wav' || type == '.wma'){
													return 'music'
										}
					}
}

module.exports =  new fileTyper();