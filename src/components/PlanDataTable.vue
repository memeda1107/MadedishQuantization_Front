<template>
    <div style="padding-left: 10px;">
        <a-button class="button" style="margin-bottom: 8px " @click="handleAdd" >新增</a-button>
        <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
            <template #bodyCell="{ column, text, record }">
                <template
                    v-if="['subjectName', 'stockName', 'operate', 'expectOpen', 'operatePlan'].includes(column.dataIndex)">
                    <div>
                        <a-input v-if="editableData[record.key]"
                            v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
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
                            <!-- <a @click="edit(record.key)">编辑</a> -->
                             <EditOutlined @click="edit(record.key)" class="button-form"></EditOutlined>
                            <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
                                <DeleteOutlined class="button-form"></DeleteOutlined>
                            </a-popconfirm>
                        </span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
</template>
<script setup>
import { cloneDeep } from 'lodash-es';
import { computed, reactive, ref, onMounted, watch } from 'vue';
import { message } from 'ant-design-vue';
import api from '../api/request';

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
});

function init() {
    if (props.type == "edit") {
        api.get('api/getStockPlan', { params: { review_diary_id: props.id } }).then(response => {
            console.log('table。。。。。。。。。。Response:', response)
            for (let i = 0; i < response.length; i++) {
                const newData = {
                    key: `${count.value}`,
                    stockName: response[i].stockName,
                    operate: response[i].operate,
                    expectOpen: response[i].expectOpen,
                    operatePlan: response[i].operatePlan,
                    reviewDiaryId: response[i].reviewDiaryId,
                    id: response[i].id,
                    isNewData: false,
                    subjectName: response[i].subjectName
                };
                dataSource.value.push(newData)
            }
        })
            .catch(error => {
                console.error('Error:', error);
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
const count = computed(() => dataSource.value.length);


const handleAdd = () => {
    const newData = {
        key: `${count.value}`,
        subjectName: '',
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
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const onDelete = (key) => {
    api.delete('api/deleteStockPlan', {
        data: { id: data[key].id }
    }).then(response => {
        console.log('Response:', response);
        message.success('删除成功', 3);
    }).catch(error => {
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
    if (data[key].isNewData) {
        api.post('api/addStockPlan', data[key])
            .then(response => {
                console.log('Response:', response);
                data[key].id = response.id;
                data[key].isNewData = false;
                message.success('新增成功', 3);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    else {
        api.post('api/editStockPlan', data[key])
            .then(response => {
                console.log('Response:', response);
                message.success('保存成功', 3);
            })
            .catch(error => {
                console.error('Error:', error);
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