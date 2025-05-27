<template>
    <a-button class="editable-add-btn" style="margin-bottom: 8px " @click="handleAdd">新增</a-button>
    <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
        <template #bodyCell="{ column, text, record }">
            <template
                v-if="['subjectName','stockName', 'operate', 'expectOpen', 'operatePlan'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        style="margin: -5px 0" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="editableData[record.key]">
                        <a-typography-link
                            @click="save(record.key); console.log('Saving key:', record.key)">保存</a-typography-link>
                        <a-popconfirm title="确定取消?" @confirm="cancel(record.key)">
                            <a>取消</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a @click="edit(record.key)">编辑</a>
                        <!-- <a @click="delete(record.key)">删除</a> -->
                        <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
                            <a>删除</a>
                        </a-popconfirm>
                    </span>
                </div>
            </template>
        </template>
    </a-table>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { computed, reactive, ref, onMounted,watch } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

const props = defineProps({

    id: Number,
    type: String,
    date: String

})
watch(
  () => props.id,
  (newVal) => console.log('id已更新:', newVal)
);
onMounted(() => {
    init();
    //   getMonthDates()
});

function init() {

    console.log('.........id', props.id)
    console.log('.........type', props.type)
    console.log('.........date', props.date)

    if (props.type == "edit") {
        axios.get('http://127.0.0.1:5000/api/getStockPlan', { params: { review_diary_id: props.id } }).then(response => {
            console.log('table。。。。。。。。。。Response:', response)
            for (let i = 0; i < response.data.length; i++) {
                // key: `${count.value}`,
                const newData = {
                    key: `${count.value}`,
                    stockName: response.data[i].stockName,
                    operate: response.data[i].operate,
                    expectOpen: response.data[i].expectOpen,
                    operatePlan: response.data[i].operatePlan,
                    reviewDiaryId: response.data[i].reviewDiaryId,
                    id: response.data[i].id,
                    isNewData: false,
                    subjectName:response.data[i].subjectName
                };
                dataSource.value.push(newData)
            }
            // data=response;
        })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误响应，例如显示错误消息等
            });
    }


}
const columns = [
     {
        title: '题材',
        dataIndex: 'subjectName',
        width: '10%',
    },
    {
        title: '股票名称',
        dataIndex: 'stockName',
        width: '15%',
    },
     {
        title: '卖出或买入',
        dataIndex: 'operate',
        width: '5%',
    },
    {
        title: '预期开盘',
        dataIndex: 'expectOpen',
        width: '15%',
    },
    {
        title: '卖出或买入方案',
        dataIndex: 'operatePlan',
        width: '15%',
    },
    {
        title: '操作 ',
        dataIndex: 'operation',
        width: '15%',
    },
];
const data = [];
const dataSource = ref(data);
const editableData = reactive({});
// const count = computed(() => dataSource.value.length + 1);
const count = computed(() => dataSource.value.length);


const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        stockName: ``,
        operate: ``,
        expectOpen: ``,
        operatePlan: ``,
        reviewDiaryId: props.id,
        isNewData: true,
    };
    dataSource.value.push(newData);
};
const edit = key => {
    console.log('测试。。。。。。。。。。。key:', key);
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const onDelete = (key) => {
    axios.delete('http://127.0.0.1:5000/api/deleteStockPlan',{
      data: { id: data[key].id}}).then(response =>{
        console.log('Response:', response);
                message.success('删除成功', 3);
      }).catch(error=>{
        console.error('Error:', error);
      })
    dataSource.value = dataSource.value.filter(item => item.key !== key);
};
const save = key => {
    console.log('id', props.id)
    if (!props.id) {
        message.error('请先保存表单！');
        return;
    }
    Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);


    console.log('测试。。。。。。。。。。。data:', key, data[key]);
    // console.log('测试。。。。。。。。。。。dataSource:', key, dataSource.value.filter(item => key === item.key)[0]);

    if (data[key].isNewData) {
        axios.post('http://127.0.0.1:5000/api/addStockPlan', data[key])
            .then(response => {
                console.log('Response:', response);
                // 处理成功响应，例如显示成功消息等
                message.success('保存成功', 3);
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误响应，例如显示错误消息等
            });
    }
    else {
        axios.post('http://127.0.0.1:5000/api/editStockPlan', data[key])
            .then(response => {
                console.log('Response:', response);
                // 处理成功响应，例如显示成功消息等
                message.success('保存成功', 3);
            })
            .catch(error => {
                console.error('Error:', error);
                // 处理错误响应，例如显示错误消息等
            });
    }



    delete editableData[key];
};
const cancel = key => {
    delete editableData[key];
};
</script>
<style scoped>
.editable-row-operations a {
    margin-right: 8px;
}
</style>