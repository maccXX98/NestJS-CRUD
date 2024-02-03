import { TasksService } from '../src/tasks/tasks.service';
import { Task, TaskStatus } from '../src/tasks/entities/task.entity';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(() => {
    tasksService = new TasksService();
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: '1',
          title: 'Task 1',
          description: 'Task 1 description',
          status: TaskStatus.PENDING,
        },
      ];
      expect(await tasksService.getTasks()).toEqual(result);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', async () => {
      const result: Task = {
        id: '1',
        title: 'Task 1',
        description: 'Task 1 description',
        status: TaskStatus.PENDING,
      };
      expect(await tasksService.getTaskById('1')).toEqual(result);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const title = 'Test Task';
      const description = 'Test Description';
      const task = await tasksService.createTask(title, description);
      expect(task.title).toBe(title);
      expect(task.description).toBe(description);
      expect(task.status).toBe(TaskStatus.PENDING);
    });
  });

  describe('updateTask', () => {
    it('should update a task', async () => {
      const id = '1';
      const updateFields = {
        title: 'Updated Task',
        description: 'Updated Description',
      };
      const result: Task = {
        id,
        ...updateFields,
        status: TaskStatus.PENDING,
      };
      expect(await tasksService.updateTask(id, updateFields)).toEqual(result);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const id = '1';
      tasksService.deleteTask(id);
      expect(await tasksService.getTaskById(id)).toBeUndefined();
    });
  });
});
