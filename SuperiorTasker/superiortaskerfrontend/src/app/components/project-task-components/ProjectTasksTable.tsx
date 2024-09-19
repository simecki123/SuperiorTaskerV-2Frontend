/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import Pagination from "../profile-page-components/user-data-options/all-tasks-components/Pagination";
import TaskStatusModal from "../modals/TaskStatusModal";

export default function ProjectTasksTable({ tasks }: any) {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastTask = currentPage * itemsPerPage;
  const indexOfFirstTask = indexOfLastTask - itemsPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const t = useTranslations('project-tasks');
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('title')}</Th>
            <Th>{t('description')}</Th>
            <Th>{t('project')}</Th>
            <Th>{t('status')}</Th>
            <Th>{t('actions')}</Th> {/* New column for modal action */}
          </Tr>
        </Thead>
        <Tbody>
          {currentTasks.map((task: any) => (
            <Tr key={task.id}>
              <Td>{task.title}</Td>
              <Td>{task.description}</Td>
              <Td>{task.projectName}</Td>
              <Td>
                <Badge colorScheme={task.status === "done" ? "green" : "red"}>
                  {task.status === "done" ? `${t('done')}` : `${t('in-progress')}` }
                </Badge>
              </Td>
              <Td>
                <TaskStatusModal /> {/* Modal button */}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={tasks.length} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
}
