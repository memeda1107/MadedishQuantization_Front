<template>
    <a-form :model="formState" name="basic" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed"
        layout="horizontal" labelWrap="true">
        <div class="d-flex flex-wrap  ">
            <a-form-item label="今日收益" name="income">
                <a-input-number v-model:value="formState.income" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="大盘走势" name="marketTrend">
                <a-input v-model:value="formState.marketTrend" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="大盘涨幅（%）" name="marketIncrease">
                <a-input-number v-model:value="formState.marketIncrease" size="large" style="width: 100%"  :precision="2" :step="0.01"/>
            </a-form-item>
            <a-form-item label="成交量（亿）" name="turnover">
                <a-input-number v-model:value="formState.turnover" size="large" style="width: 100%" :precision="2" :step="0.01" />
            </a-form-item>
            <a-form-item label="上涨家数" name="numberOfRising ">
                <a-input-number v-model:value="formState.numberOfRising" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="下跌家数" name="numberOfFalling ">
                <a-input-number v-model:value="formState.numberOfFalling" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="涨停家数" name="NumberOfLimitUp">
                <a-input-number v-model:value="formState.numberOfLimitUp" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="跌停家数" name="NumberOfLimitDown">
                <a-input-number v-model:value="formState.numberOfLimitDown" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="炸板率" name="explosionRate">
                <a-input-number v-model:value="formState.explosionRate" size="large" style="width: 100%" :precision="2" :step="0.01" />
            </a-form-item>
            <a-form-item label="昨日涨停" name="yesterdayLimitUp">
                <a-input-number v-model:value="formState.yesterdayLimitUp" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="昨日连板" name="yesterdayConnectingPlate">
                <a-input-number v-model:value="formState.yesterdayConnectingPlate" size="large" style="width: 100%" />
            </a-form-item>
            <a-form-item label="短线资金" name="ShortTermFunds">
                <a-input-number v-model:value="formState.shortTermFunds" size="large" style="width: 100%" />
            </a-form-item>
        </div>
        <a-row>
            <a-col :span="24">
                <a-form-item label="整体盘面回顾" name="overallMarketReview" style="min-width: 1500px;alignment: left">
                    <a-textarea v-model:value="formState.overallMarketReview" :rows="1" />
                </a-form-item>
            </a-col>
        </a-row>
        <a-divider>题材回顾</a-divider>
        <SubjectDtaTable :id="reviewDiaryId" :type="type" :date="date"></SubjectDtaTable>
        <a-divider>明日板块与龙头人气股推演</a-divider>
        <a-form-item label="板块是否分歧" name="anyDifferencesSectors" style="min-width: 1500px;alignment: left">
            <a-textarea v-model:value="formState.anyDifferencesSectors" :rows="1" />
        </a-form-item>
        <a-form-item label="龙头预期" name="expectedLeaders" style="min-width: 1500px;alignment: left">
            <a-textarea v-model:value="formState.expectedLeaders" :rows="1" />
        </a-form-item>
        <a-form-item label="今日最优解是谁？为什么？" name="todayBestSolution" style="min-width: 1500px;alignment: left">
            <a-textarea v-model:value="formState.todayBestSolution" :rows="1" />
        </a-form-item>
        <a-form-item label="今日交易犯的错误，如何改进？" name="mistakesMadeToday" style="min-width: 1500px;alignment: left">
            <a-textarea v-model:value="formState.mistakesMadeToday" :rows="1" />
        </a-form-item>
        <a-divider>明日买入\卖出方案</a-divider>
        <PlanDtaTable :id="reviewDiaryId" :type="type" :date="date"></PlanDtaTable>
        <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
            <a-button type="primary" html-type="submit" @click="submit">提交</a-button>
        </a-form-item>
    </a-form>
</template>
<script setup>
import { reactive, onMounted, watch,ref } from 'vue';
import SubjectDtaTable from '../components/SubjectDataTable.vue'
import PlanDtaTable from '../components/PlanDataTable.vue'
import axios from 'axios';
import { message } from 'ant-design-vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { id, type,date } = route.query;
const finalType = type || 'add';
console.log('接收到的参数:', { id, type: finalType ,date});

const reviewDiaryId=ref(id)


// const tableData = [];


// const props = defineProps({
// type: String
//  });

watch(
    () => route.query.type,
    (newType) => {
        console.log('路由参数变化:', newType);
    }
);


onMounted(() => {
    init();
    //   getMonthDates()
});

function init() {
    console.log('..............type', type)
    console.log('..............id', id)
    console.log('..............date', date)
    if (type == "edit") {
        axios.get('http://127.0.0.1:5000/api/get_diary', {
            params: {
                id: id
            }
        }).then(response => {
            console.log('Response:', response);
            Object.assign(formState, response.data[0]);
            // 处理成功响应，例如显示成功消息等

        })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误响应，例如显示错误消息等
            });
    }
    else
    {
        formState.recordDate=date;
    }


}

// let type="add";


const formState = reactive({
    income: 0,
    marketTrend: '',
    marketIncrease: 0,
    turnover: 0,
    numberOfRising: 0,
    numberOfFalling: 0,
    numberOfLimitUp: 0,
    numberOfLimitDown: 0,
    explosionRate: 0,
    yesterdayLimitUp: 0,
    yesterdayConnectingPlate: 0,
    shortTermFunds: 0,
    overallMarketReview: '',
    anyDifferencesSectors: '',
    expectedLeaders: '',
    todayBestSolution: '',
    mistakesMadeToday: '',
    recordDate: new Date().toLocaleDateString(),

});
const onFinish = values => {
    console.log('Success:', values);

};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};


function submit() {
    if (type == "add") {
        console.log('............formState',formState)
        axios.post('http://127.0.0.1:5000/api/addDiary', formState)
            .then(response => {
                console.log('Response:', response.data.id);
                message.success('保存成功', response.data.id);
                 reviewDiaryId.value= response.data.id;
                console.log('submit..............id:', id);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else
    {
        axios.post('http://127.0.0.1:5000/api/edit_diary', formState)
            .then(response => {
                console.log('Response:', response.data.id);
                message.success('保存成功', response.data.id);
                id.value = response.data.id;
                
            })
            .catch(error => {
                console.error('Error:', error);
            });


    }

}

// console.log('Success:', values);
// }
</script>