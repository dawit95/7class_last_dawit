<template>
    <section id="about" class="about">
	<div class="container" data-aos="fade-up">
		<div class="section-title">
			<h2>search</h2>
			<p>집 찾기</p>
            <button @click="test">테스트</button>
		</div>

		<div class="row">
			<!-- filters start -->
			<div class="sorting-filters col-md-6 text-center mb-20 d-flex">
				
				<!-- form태그는 디자인 때문에 씀!!!!!! -->
				<form class="form-inline" id="frm" action="">
					<!-- <input type="hidden" id="code"  name="code" value="code"/> -->
					<div class="form-group md">
						<select class="form-control mr-3" name="sido" id="sido">
							<option value="0">도/광역시</option>
						</select>
					</div>
					<div class="form-group md-1">
						<select class="form-control mr-3" name="dongcode" id="gugun">
							<option value="0">시/구/군</option>
						</select>
					</div>
					<div class="form-group md-1">
						<select class="form-control" name="dong" id="dong">
							<option value="0">동</option>
						</select>
					</div>
				</form>
			</div>
			<div class="col-md-1"></div>
			<div class="col-md-5 justify-content-right">
			<form class="form-inline" >
				<div>
					<div class="form-group " style="float: left">
						실거래가 검색 : 
						<input class="form-control ml-2 mr-2" type="text" name="start" id="startPrice" style="width:110px" placeholder="(만원)이상" value=""/>
						 ~
					</div>
					
					<div class="form-group" style="float: left">
						<input class="form-control ml-2" name="end" type="text" id="endPrice" placeholder="(만원)이하"
							value="" style="width:110px">
					</div>
					<div class="form-group ml-2" style="float: left">
						<button type="button" class="ml-1" id="serachPrice" style="height:30pt"
							onclick="javascript:test();">검색</button>
					</div>
				</div>
			</form>
			</div>
		</div>

	</div>
</section>
</template>

<script>
import axios from '@/util/http-common';

export default {
    name: 'searchForm',
    methods: {
        test() {
            axios
            .get('/address/sido')
            .then(({ response }) => {
            console.log(response)
            })
            .catch((error) => {
            alert(error);
            });
        },
    }
};
</script>

<style>
</style>
