import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TaskFilters from "../components/TaskFilters";
import TaskTable from "../components/TaskTable";
import CreateTaskModal from "../modals/CreateTaskModal";
import EditTaskModal from "../modals/EditTaskModal";
import useTasks from "../hooks/useTasks";
import "./TaskList.css";

const initialFilters = {
  search: "",
  status: "",
  priority: "",
  assignee: "",
  project: "",
};

function TaskList() {
  const navigate = useNavigate();

  const { tasks, loading, fetchTasks, removeTask } = useTasks();

  const [filters, setFilters] = useState(initialFilters);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  /*
  =========================================================
  Temporary dropdown data
  Replace these arrays with backend data when Project and
  Employee APIs are connected.
  =========================================================
  */

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const projects = [
    {
      id: "11111111-1111-4111-8111-111111111111",
      name: "WeThink Project",
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const modules = [
    {
      id: "22222222-2222-4222-8222-222222222222",
      name: "Task Management",
    },
  ];

  const assignees = [];

  /*
  =========================================================
  Filter Tasks
  =========================================================
  */

  const filteredTasks = useMemo(() => {
    const searchText = filters.search.trim().toLowerCase();

    return tasks.filter((task) => {
      const title = task.title?.toLowerCase() || "";

      const assigneeName =
        task.assigneeName?.toLowerCase() ||
        task.assignee_name?.toLowerCase() ||
        task.assignee?.toLowerCase() ||
        "";

      const taskStatus = task.status?.toLowerCase().replace(/\s+/g, "");

      const selectedStatus = filters.status?.toLowerCase().replace(/\s+/g, "");

      const taskProjectId =
        task.project_id || task.projectId || task.project?.id || task.project;

      const taskAssigneeId =
        task.assignee_id || task.assigneeId || task.assignee?.id;

      const matchesSearch =
        !searchText ||
        title.includes(searchText) ||
        assigneeName.includes(searchText);

      const matchesStatus = !filters.status || taskStatus === selectedStatus;

      const matchesPriority =
        !filters.priority ||
        task.priority?.toLowerCase() === filters.priority.toLowerCase();

      const matchesAssignee =
        !filters.assignee ||
        String(taskAssigneeId) === String(filters.assignee);

      const matchesProject =
        !filters.project || String(taskProjectId) === String(filters.project);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesProject
      );
    });
  }, [tasks, filters]);

  /*
  =========================================================
  Display Tasks
  =========================================================
  */

  const displayTasks = useMemo(() => {
    return filteredTasks.map((task) => {
      const project = projects.find(
        (item) =>
          String(item.id) ===
          String(task.project_id || task.projectId || task.project),
      );

      const module = modules.find(
        (item) =>
          String(item.id) ===
          String(task.module_id || task.moduleId || task.module),
      );

      return {
        ...task,
        projectName:
          task.projectName ||
          task.project?.project_name ||
          project?.name ||
          "No Project",
        moduleName:
          task.moduleName ||
          task.module?.module_name ||
          module?.name ||
          "No Module",
        assigneeName:
          task.assigneeName ||
          task.assignee_name ||
          task.assignee?.name ||
          "Unassigned",
      };
    });
  }, [filteredTasks, projects, modules]);
  /*
  =========================================================
  Filter Actions
  =========================================================
  */

  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  /*
  =========================================================
  Task Actions
  =========================================================
  */

  const handleView = (task) => {
    navigate(`/tasks/${task.id}`);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  const handleDelete = async (task) => {
    try {
      await removeTask(task.id);
    } catch (error) {
      console.error(
        "Delete task failed:",
        error.response?.data?.message || error.message,
      );
    }
  };

  /*
  =========================================================
  Modal Success Actions
  The Create/Edit modals already call their API functions.
  These handlers only refresh the task list.
  =========================================================
  */

  const handleCreateSuccess = async () => {
    setCreateOpen(false);
    await fetchTasks();
  };

  const handleUpdateSuccess = async () => {
    setEditOpen(false);
    setSelectedTask(null);
    await fetchTasks();
  };

  return (
    <div className="task-list-page">
      <div className="task-list-header">
        <div>
          <h1>Task Management</h1>
          <p>Manage, assign and track all tasks across projects.</p>
        </div>

        <button
          type="button"
          className="create-task-btn"
          onClick={() => setCreateOpen(true)}
        >
          <Plus size={18} />
          Create Task
        </button>
      </div>

      <TaskFilters
        filters={filters}
        setFilters={setFilters}
        projects={projects}
        assignees={assignees}
        totalTasks={displayTasks.length}
        onReset={handleResetFilters}
      />

      <TaskTable
        tasks={displayTasks}
        loading={loading}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreateTask={() => setCreateOpen(true)}
      />

      <CreateTaskModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSuccess={handleCreateSuccess}
        projects={projects}
        modules={modules}
        dependencies={tasks}
      />

      <EditTaskModal
        open={editOpen}
        task={selectedTask}
        onClose={() => {
          setEditOpen(false);
          setSelectedTask(null);
        }}
        onSuccess={handleUpdateSuccess}
        projects={projects}
        modules={modules}
        dependencies={tasks.filter((task) => task.id !== selectedTask?.id)}
      />
    </div>
  );
}

export default TaskList;
