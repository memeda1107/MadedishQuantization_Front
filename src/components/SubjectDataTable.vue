<template>
    <div style="padding-left: 10px;">
        <a-button class="button" style="margin-bottom: 8px; " @click="handleAdd">新增</a-button>
        <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
            <template #bodyCell="{ column, text, record }">
                <template
                    v-if="['subjectName', 'core', 'pioneer', 'middleArmy', 'numberOfLimitUp', 'middleArmy', 'increase', 'genreTrends', 'persistence'].includes(column.dataIndex)">
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
                            <a @click="edit(record.key)">编辑</a>
                            <a-popconfirm v-if="dataSource.length" title="确认删除？" @confirm="onDelete(record.key)">
                                <a>删除</a>
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
        api.get('api/get_subject', { params: { review_diary_id: props.id } }).then(response => {
            console.log('table。。。。。。。。。。Response:', response)
            for (let i = 0; i < response.length; i++) {
                const newData = {
                    key: `${count.value}`,
                    core: response[i].core,
                    pioneer: response[i].pioneer,
                    middleArmy: response[i].middleArmy,
                    numberOfLimitUp: response[i].numberOfLimitUp,
                    increase: response[i].increase,
                    genreTrends: response[i].genreTrends,
                    persistence: response[i].persistence,
                    // date: props.date,
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
        title: '题材名称',
        dataIndex: 'subjectName',
        width: '10%',
    },
    {
        title: '核心',
        dataIndex: 'core',
        width: '15%',
    },
    {
        title: '先锋',
        dataIndex: 'pioneer',
        width: '15%',
    },
    {
        title: '中军',
        dataIndex: 'middleArmy',
        width: '15%',
    },
    {
        title: '涨停家数',
        dataIndex: 'numberOfLimitUp',
        width: '5%',
    },
    {
        title: '涨幅',
        dataIndex: 'increase',
        width: '5%',
    },
    {
        title: '题材趋势',
        dataIndex: 'genreTrends',
        width: '15%',
    },
    {
        title: '持续性',
        dataIndex: 'persistence',
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
        core: ``,
        pioneer: ``,
        middleArmy: ``,
        numberOfLimitUp: 0,
        increase: 0,
        genreTrends: ``,
        persistence: ``,
        reviewDiaryId: props.id,
        isNewData: true,
        subjectName: ''

    };
    dataSource.value.push(newData);
};
const edit = key => {
    editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
};
const onDelete = (key) => {
    api.delete('api/delete_subject', {
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
        api.post('api/addSubject', data[key])
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
        api.post('api/edit_subject', data[key])
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