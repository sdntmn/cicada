// import React, { useEffect } from "react"

// import { Item, SearchField, Typography } from "itpc-ui-kit"

// import { getUser } from "@/entities/User"
// import { useAppDispatch } from "@/shared/lib/store"
// import { Flex } from "@/shared/ui/layout/Flex"
// import { MultiSelectField } from "@/shared/ui/MultiSelectField/ui/MultiSelect"

// import "./styles.scss"

// export const Search: React.FC = () => {
//   const dispatch = useAppDispatch()
//   // const { accounts } = useAppSelector((state) => state.accounts)

//   useEffect(() => {
//     dispatch(getUser("1"))
//   }, [])

//   const mockStreetItemsWithoutApartment: Item[] = [
//     { id: "1", value: "проезд Тест, д.10" },
//     { id: "2", value: "ул. Республики, д.45" },
//     { id: "3", value: "ул. Ленина, д.22" },
//     { id: "4", value: "ул. 50 лет Октября, д.17" },
//     { id: "5", value: "пр. Мира, д.8" },
//     { id: "6", value: "ул. Широтная, д.63" },
//     { id: "7", value: "ул. Свободы, д.31" },
//     { id: "8", value: "ул. Профсоюзная, д.12" },
//     { id: "9", value: "ул. Гагарина, д.5" },
//     { id: "10", value: "ул. Пермякова, д.28" },
//     { id: "11", value: "ул. Комсомольская, д.44" },
//     { id: "12", value: "ул. Мельникайте, д.71" },
//     { id: "13", value: "ул. Спортивная, д.15" },
//     { id: "14", value: "ул. Альпинистов, д.9" },
//     { id: "15", value: "ул. Набережная, д.37" },
//   ]

//   return (
//     <Flex className="search" gap={8} vertical>
//       <Typography.Title level={6}> Поисковая строка </Typography.Title>
//       <MultiSelectField
//         onChange={() => {
//           console.info(" мультисилект")
//         }}
//         className="main-page__multiselect"
//         items={mockStreetItemsWithoutApartment}
//       />
//       <SearchField
//         onChange={() => {
//           console.info(" сеарч")
//         }}
//         className="main-page__search"
//         items={[]}
//       />
//     </Flex>
//   )
// }
