<template>
    <div class="flex justify-content-end py-2 px-3 mb-5" style="background-color: #EFEFEF;">
        <Button label="Logout" class="p-button-text" @click="logout" />
    </div>
    <DataTable :value="users" :paginator="true" class="p-datatable-customers" :rows="10" dataKey="id" :rowHover="true"
        :loading="loading"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[10, 25, 50]" currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        responsiveLayout="scroll">
        <template #header>
            <div class="flex justify-content-between align-items-center">
                <h2 class="m-0">Users</h2>
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText placeholder="Keyword Search" />
                </span>
            </div>
        </template>
        <template #empty>
            No users found.
        </template>
        <Column field="name" header="Name">
            <template #loading>


            </template>
        </Column>
        <Column field="lastName" header="Last name">
            <template #loading>


            </template>
        </Column>
    </DataTable>

</template>

<script>

export default {
    name: "Users",
    data() {
        return {
            loading: false,
            users: [
                {
                    name: "test",
                    lastName: "test2"
                },
                {
                    name: "test3",
                    lastName: "test4"
                }
            ]
        }
    },
    method: {
        logout() {
            console.log('logout');
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead>tr>th {
        text-align: left;
    }

    .p-datatable-tbody>tr>td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>