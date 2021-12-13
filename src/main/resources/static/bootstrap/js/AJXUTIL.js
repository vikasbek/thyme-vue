var AJXUTIL = (function(){
	return{
		
//		getJsonData: function(url){
//			let response;
//			$.ajax({
//				url: url,
//				async: false,
//				dataType: 'json',
//				xhrFields: {
//			      withCredentials: true
//			    },
//				success: function (data) {
//					//prepareSuccess(data);
//					let payload={"status":"S","data":data};
//					response = payload;
//					return payload;
//				},
//		        error: function(e){
//		        	console.log("error:"+e);
//		        	//prepareError(e);
//		        	let payload={"status":"F","error":e};
//		        	response = payload;
//		        	return payload;
//		   		}
//			});
//			return response;
//		},
//
//		// output a value based on the current configuration
//		prepareSuccess: function (data) {
//		  console.log("In prepareSuccess:" + data)
//		},
//		
//		// override the current configuration
//		prepareError: function( e ) {
//			console.log("In prepare error:"+e);
//		},
		
		applyPagination: function(pageTagId, currentPage, visiblePages, recordPerpage,  pathUrl, queryParams, successCallbackFunction, failureCallBackFunction){
			var $pagination = $(pageTagId);
			$pagination.twbsPagination('destroy');

			$pagination.twbsPagination({
				totalPages: 1,
				visiblePages: visiblePages,
				onPageClick: null,
				onPageClick: function (event, page) {
					console.log("page: "+ page + ", currentPage" + currentPage);
					if(currentPage != page){
						let endUrl= pathUrl + "?";
						for(var query=0;query<queryParams.length;query++){
							endUrl += queryParams[query].key + "=" + queryParams[query].value + "&";
						}
						endUrl += "pageNo="+ (page-1)*recordPerpage;
						endUrl += "&limit="+recordPerpage;
						$.ajax({
							url: endUrl,
							async: false,
							dataType: 'json',
							xhrFields: {
						       withCredentials: true
						    },
							success: function (data) {
								var totalRecords = data.totalCount;
								totalPages = Math.ceil(totalRecords / recordPerpage);
								successCallbackFunction(data);
								currentPage = page;
								$pagination.twbsPagination({
									totalPages: totalPages, 
									visiblePages: visiblePages,
									first:'<i class="fas fa-fast-backward"></i>',
									prev:'<i class="fas fa-backward"></i>',
									next:'<i class="fas fa-forward"></i>',
									last:'<i class="fas fa-fast-forward"></i>',
									onPageClick:null
									});
							},
					        error: function(e){
					        	console.log("error:"+e);
					        	failureCallBackFunction(e);
					   		}
						});
					}
				}
			});
			
		}
		
	}
}());