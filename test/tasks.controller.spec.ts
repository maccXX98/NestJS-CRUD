import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from '../src/tasks/tasks.controller';
import { TasksService } from '../src/tasks/tasks.service';
import { Task, TaskStatus } from '../src/tasks/entities/task.entity';

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [TasksService],
    }).compile();

    tasksService = module.get<TasksService>(TasksService);
    tasksController = module.get<TasksController>(TasksController);
  });

  describe('getTask', () => {
    it('should return an array of tasks', async () => {
      const result: Task[] = [
        {
          id: '1',
          title: 'Test Task',
          description: 'Test Description',
          status: TaskStatus.PENDING,
        },
      ];
      jest.spyOn(tasksService, 'getTasks').mockImplementation(() => result);
      expect(await tasksController.getTask()).toBe(result);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const result = {
        id: '1', // Añade un id
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.PENDING, // Añade un estado
      };
      jest.spyOn(tasksService, 'createTask').mockImplementation(() => result);
      expect(await tasksController.createTask(result)).toBe(result);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', async () => {
      const taskId = '1';
      jest.spyOn(tasksService, 'deleteTask').mockImplementation(() => {});
      expect(await tasksController.deleteTask(taskId)).toBeUndefined();
    });
  });

  describe('updateTaskStatus', () => {
    it('should update a task', async () => {
      const taskId = '1';
      const updateFields = {
        title: 'Updated Task',
        description: 'Updated Description',
      };
      const result = {
        ...updateFields,
        id: taskId,
        status: TaskStatus.PENDING, // Añade un estado
      };
      jest.spyOn(tasksService, 'updateTask').mockImplementation(() => result);
      expect(await tasksController.updateTaskStatus(taskId, updateFields)).toBe(
        result,
      );
    });
  });
});
