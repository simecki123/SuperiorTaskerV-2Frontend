// ProjectTasksTable.tsx
import { Table, Thead, Tbody, Tr, Th, Td, Badge, Box } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import TaskStatusModal from "../modals/TaskStatusModal";
import { Task } from "@/app/interfaces/types";

export default function ProjectTasksTable({ tasks }: {tasks: Task[]}) {
  const t = useTranslations('project-tasks');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>{t('title')}</Th>
            <Th>{t('description')}</Th>
            <Th>{t('start-date')}</Th>
            <Th>{t('end-date')}</Th>
            <Th>{t('status')}</Th>
            <Th>{t('actions')}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tasks.map((task: Task) => (
            <Tr key={task.id}>
              <Td>{task.name}</Td>
              <Td>{task.description}</Td>
              <Td>{formatDate(task.startDate)}</Td>
              <Td>{formatDate(task.endDate)}</Td>
              <Td>
                <Badge colorScheme={task.taskStatus === "COMPLETED" ? "green" : "red"}>
                  {task.taskStatus === "COMPLETED" ? t('done') : t('in-progress')}
                </Badge>
              </Td>
              <Td>
                <TaskStatusModal />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}