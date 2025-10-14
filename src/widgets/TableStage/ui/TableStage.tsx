import React, { useEffect } from "react"

import { NumberColumns } from "itpc-ui-kit"

import { getAccounts } from "@/entities/Accounts/model/thunk/thunk"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { TableSort } from "@/shared/ui/TableSort"

import { dataColumnsStage } from "../lib/helpers/columns/columns"

import "./styles.scss"

export const TableStage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.accounts)

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  return (
    <div className="table-stage">
      <TableSort
        className="table-stage__sort"
        columns={dataColumnsStage}
        rows={accounts}
        sortByNumberColumns={NumberColumns.TWO}
        isShowRowIndex
      />
    </div>
  )
}
