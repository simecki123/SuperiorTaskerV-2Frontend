"use client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Heading,
  VStack,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { User, UserStatistics as UserStatsType } from "@/app/interfaces/types";
import { fetchUserStatistics } from "@/app/server-actions/fetchUsersStatistics";
import { useTranslations } from "next-intl";

export default function UserStatistics({ user }: { user: User }) {
  const [stats, setStats] = useState<UserStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const t = useTranslations('user-statistics');

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchUserStatistics(user, user.accessToken);
        setStats(data);
      } catch (error) {
        toast({
          title: t('error-fetching-statistics'),
          description: error instanceof Error ? error.message : t('unknown-error-occurred'),
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user, toast, t]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!stats) {
    return <Text>{t('no-stats-available')}</Text>;
  }

  const taskData = [
    { name: t('finished'), value: stats.numberOfFinishedTasks },
    { name: t('unfinished'), value: stats.numberOfUnfinishedTasks },
  ];

  const projectData = [
    { name: t('completed'), value: stats.numberOfCompletedProjects },
    { name: t('incomplete'), value: stats.numberOfIncompleteProjects },
  ];

  const statsCards = [
    { label: t('total-tasks'), value: stats.numberOfTasks },
    { label: t('total-projects'), value: stats.numberOfProjects },
    { label: t('completed-tasks'), value: stats.numberOfFinishedTasks },
    { label: t('completed-projects'), value: stats.numberOfCompletedProjects },
  ];

  return (
    <VStack spacing={8} w="full">
      <Heading size="lg">{t('dashboard-statistics')}</Heading>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={6}
        w="full"
      >
        {statsCards.map((stat, index) => (
          <Box
            key={index}
            p={6}
            bg={bgColor}
            borderRadius="lg"
            borderWidth="1px"
            borderColor={borderColor}
            className="shadow-lg hover:shadow-xl transition-shadow duration-200"
          >
            <Stat>
              <StatLabel fontSize="lg">{stat.label}</StatLabel>
              <StatNumber fontSize="2xl">{stat.value}</StatNumber>
            </Stat>
          </Box>
        ))}
      </Grid>

      <Grid templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }} gap={8} w="full">
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          h="400px"
        >
          <Heading size="md" mb={4}>{t('tasks-distribution')}</Heading>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {taskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        <Box
          p={6}
          bg={bgColor}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={borderColor}
          h="400px"
        >
          <Heading size="md" mb={4}>{t('projects-status')}</Heading>
          <ResponsiveContainer width="100%" height="100%">
                      <Box
              p={6}
              bg={bgColor}
              borderRadius="lg"
              borderWidth="1px"
              borderColor={borderColor}
              h="400px"
            >
              <Heading size="md" mb={4}>{t('projects-status')}</Heading>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    allowDecimals={false}
                    domain={[0, 'auto']}
                    tickCount={stats.numberOfProjects +1}
                  />
                  <Tooltip 
                    formatter={(value, name, props) => [`${value}`, props.payload.name]}
                    labelFormatter={(label) => ''}
                  />
                  <Legend />
                  <Bar dataKey="value" name={t('projects')} fill="#8884d8">
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </VStack>
  );
}