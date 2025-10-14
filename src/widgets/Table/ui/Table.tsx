import React, { useEffect, useState } from "react"

import { NumberColumns } from "itpc-ui-kit"

import { getAccounts } from "@/entities/Accounts/model/thunk/thunk"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store"
import { TableSort } from "@/shared/ui/TableSort"

import { dataColumns } from "../lib/helpers/columns/columns"

import "./styles.scss"

export const Table: React.FC = () => {
  const dispatch = useAppDispatch()
  const { accounts } = useAppSelector((state) => state.accounts)

  const [selectedRow, setSelectedRow] = useState<Set<string | number>>(new Set())

  const handleRowSelect = (id: string | number, checked: boolean) => {
    setSelectedRow((prev) => {
      const newSet = new Set(prev)
      if (checked) {
        newSet.add(id)
      } else {
        newSet.delete(id)
      }
      return newSet
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allId = accounts.map((account) => account.id)
      setSelectedRow(new Set(allId))
    } else {
      setSelectedRow(new Set())
    }
  }

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  return (
    <div className="table">
      <TableSort
        className="table__sort"
        columns={dataColumns}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        rows={accounts}
        selectedRow={selectedRow}
        sortByNumberColumns={NumberColumns.TWO}
        isShowRowIndex
        isShowSelection
      />
    </div>
  )
}
