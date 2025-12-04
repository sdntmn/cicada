import { useCallback } from "react"

import { useAppDispatch } from "@/shared/lib/store"
import { PageSize } from "@/shared/lib/types/types"

interface UseTablePaginationProps {
  fetchData: (params: { page: number; pageSize: PageSize }) => any
  page: number
  pageSize: PageSize
  setPageAction: (page: number) => any
  setPageSizeAction: (size: PageSize) => any
  total: number
}

export const useTablePagination = ({ fetchData, page, pageSize, setPageAction, setPageSizeAction }: UseTablePaginationProps) => {
  const dispatch = useAppDispatch()

  const handlePageChange = useCallback(
    (newPage: number) => {
      dispatch(setPageAction(newPage))
      dispatch(fetchData({ page: newPage, pageSize }))
    },
    [dispatch, pageSize, setPageAction, fetchData]
  )

  const handlePageSizeChange = useCallback(
    (newSize: PageSize) => {
      dispatch(setPageSizeAction(newSize))
      dispatch(fetchData({ page: 0, pageSize: newSize }))
    },
    [dispatch, setPageSizeAction, fetchData]
  )

  return {
    handlePageChange,
    handlePageSizeChange,
  }
}
