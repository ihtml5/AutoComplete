function DropDownList(config) {
	this.config = config;
	var configs = this.config;
	this.targetDiv = null;
	this.bigView = null;
	this.dropList = null;
	this.currObj = null;
	this.data = configs.data;
	this.eventCache = {};
	this.idx = 0;
	this.showBigView = configs.showBigView;
	this.firstShow = 0;
	this.closeState = configs.closeState;
	var self = this;
	this.init=function(){
		this.sgMain = document.getElementById(configs.main.Id);
		this.sgMain.className = configs.main.clsName;
		this.sgView = document.createElement('div');
		this.sgView.id = configs.view.Id;
		this.sgView.className = configs.view.clsName;
		this.bigView = document.createElement('div');
		this.sgClose = document.createElement('div');
		this.sgSearch = document.createElement('div');
		this.dropList = document.createElement('div');
		this.sgButton = document.createElement('span');
		this.sgInput = document.createElement('input');
		this.sgListUl = document.createElement('ul');
		this.sgView.appendChild(this.bigView);
		// this.sgView.appendChild(this.sgClose);
		this.bigView.id = configs.bigView.Id;
		this.bigView.className = configs.bigView.clsName;
		// this.sgClose.id=configs.sgClose.Id;
		// this.sgClose.innerHTML='关闭提示';
		this.sgClose.className = configs.sgClose.clsName;
		this.sgMain.appendChild(this.sgView);
		this.sgMain.appendChild(this.sgSearch);
		this.sgSearch.className = configs.sgSearch.clsName;
		this.sgSearch.id = configs.sgSearch.Id;
		this.sgSearch.appendChild(this.sgInput);
		this.sgInput.id = configs.sgInput.Id;
		this.sgInput.className = configs.sgInput.clsName;
		this.sgSearch.appendChild(this.sgButton);
		this.sgButton.className = configs.sgButton.clsName;
		this.sgSearch.appendChild(this.dropList);
		this.dropList.className = configs.dropList.clsName;
		this.initEvent();
		this.dropList.appendChild(this.sgListUl);
		this.sgButton.onclick = function(e){
			if(e.target.className === 'sgButtonBottom') {
				e.target.className = 'sgButtonTop';
				self.loadData();
				self.show();
			} else if (e.target.className === 'sgButtonTop'){
				e.target.className = 'sgButtonBottom';
				self.hide();
			}
		};
		this.sgInput.oninput = function(e) {
			self.show();
			self.sgListUl.innerHTML='';
			var result = e.target.value;
			if (result === '') {
				self.hide();
				// if(self.sgButton.className === 'sgButtonBottom') {
				// 	self.sgButton.className = 'sgButtonTop';
				// } else if (self.sgButton.className === 'sgButtonTop') {
				// 	self.sgButton.className = 'sgButtonBottom';
				// }
				this.buttonState();
			}
			self.bigView.innerHTML = result;
			for (var q = 0; q<self.data.length; q++) {
				if(self.data[q].toString().indexOf(result) !==-1 && result !=='') {
				  var sl = document.createElement('li'),pos=self.data[q].toString().indexOf(result);
				  self.sgListUl.appendChild(sl);
				  var lightChar=self.data[q].slice(0,pos)+'<span style="color:red;">'+result+'</span>'+self.data[q].slice(pos+result.length);
				  sl.innerHTML = lightChar;
				  sl.className = 'sg-li';
				  sl.onclick = function() {
				  	self.bigView.innerHTML = this.innerHTML;
				  	self.sgInput.value = this.innerHTML;
				  	// if (self.sgButton.className === 'sgButtonBottom') {
				  	// 	self.sgButton.className = 'sgButtonTop';
				  	// } else if (self.sgButton.className === 'sgButtonTop') {
				  	// 	self.sgButton.className = 'sgButtonBottom';
				  	// }
				  	self.buttonState();
				  	self.hide();
				  };
				}
			}
		};
		// this.sgClose.onclick=function(){
		// 	if(self.closeState === 0) {
		// 		this.innerHTML='开启提示';
		// 		self.bigView.style.display='none';
		// 		this.style.fontSize='12px';
		// 		this.style.color='#3fcbf9';
		// 		self.closeState=1;
		// 	} else if(self.closeState === 1) {
		// 		this.innerHTML='关闭提示';
		// 		self.bigView.style.display='block';
		// 		this.style.fontSize='12px';
		// 		this.style.color='red';
		// 		self.closeState=0;
		// 	}
		// };
		if(this.showBigView === 1) {
			self.bigView.style.display = 'block';
		} else if (this.showBigView === 0) {
			self.bigView.style.display = 'none';
		}
	};
	this.hide = function(){
		this.dropList.style.display = 'none';
		self.firstShow = 0;
		self.idx = 0;
	};
	this.show = function() {
		this.loadData();
		this.dropList.style.display = 'block';
		self.firstShow = 1;
		self.idx = 0;
	};
	this.loadData = function() {
		this.sgListUl.innerHTML='';
		for(var i=0;i<this.data.length;i++) {
			var l = document.createElement('li');
			l.innerHTML = this.data[i];
			l.className = 'sg-li';
			this.sgListUl.appendChild(l);
			l._index = i;
			l.onclick = function() {
				var content = this.innerHTML;
				self.sgInput.value = content;
				self.bigView.innerHTML = content;
				self.hide();
				self.buttonState();
			};
		}
	};
	this.buttonState = function() {
		if (self.sgButton.className === 'sgButtonBottom') {
			self.sgButton.className = 'sgButtonTop';
		} else if (self.sgButton.className === 'sgButtonTop')
		{
			self.sgButton.className = 'sgButtonBottom';
		}
	};
	this.initEvent = function(){
		window.onkeydown = function(e) {
			var ecode = window.event?window.event.keyCode : evt.which;
			if(ecode == 38 || ecode == 37){
				var lis=self.sgListUl.getElementsByTagName('li'),max=lis.length;
				if(self.dropList.style.display === 'block' && self.firstShow === 0) {
					self.firstShow = 1;
					lis[max].style.backgroundColor = '#897';
					for(var g=0;g<max-1;g++) {
						lis[g].style.backgroundColor='#f8f8f8';
					}
				} else if (self.dropList.style.display === 'block' && self.firstShow === 1) {
					self.idx--;
					if(self.idx <0) {
						self.idx = 0;
						lis[0].style.backgroundColor='#897';
					} else {
						lis[self.idx].style.backgroundColor='#897';
						for(var g =0;g<max;g++) {
							if(g !== self.idx) {
								lis[g].style.backgroundColor='#f8f8f8';
							}
						}
					}
				}
			} else if (ecode === 40 || ecode === 39) {
				var lis=self.sgListUl.getElementsByTagName('li'),max=lis.length;
				if(self.dropList.style.display === 'block' && self.firstShow === 0) {
					self.firstShow=1;
					lis[0].style.backgroundColor='#897';
					for(var g=1;g<max;g++) {
						lis[g].style.backgroundColor='#f8f8f8';
					}
				} else if(self.dropList.style.display === 'block' && self.firstShow === 1) {
					self.idx++;
					if(self.idx >max) {
						self.idx = max;
						lis[max].style.backgroundColor='#897';
					} else {
						lis[self.idx].style.backgroundColor='#897';
						for(var g=0;g<max;g++) {
							if(g !== self.idx) {
								lis[g].style.backgroundColor='#f8f8f8';
							}
						}
					}
				}
			} else if (ecode == 13) {
				var lis = self.sgListUl.getElementsByTagName('li'),max=lis.length;
				for(var h = 0;h<max;h++) {
					if(lis[h].style.backgroundColor === 'rgb(136, 153, 119)') {
						var lisContent = lis[h].innerHTML;
						self.sgInput.value = lisContent;
						self.bigView.innerHTML = lisContent;
						self.hide();
						self.buttonState();
					}
				}
			}
		};
	};
}
