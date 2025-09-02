import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import DashboardLayout from '../components/DashboardLayout';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Irrigate Field A', description: 'Water the crops in field A for 2 hours', dueDate: '2023-06-15', completed: false, priority: 'high' },
    { id: 2, title: 'Apply Fertilizer', description: 'Apply nitrogen fertilizer to field B', dueDate: '2023-06-18', completed: true, priority: 'medium' },
    { id: 3, title: 'Harvest Tomatoes', description: 'Harvest ripe tomatoes from greenhouse section 2', dueDate: '2023-06-20', completed: false, priority: 'high' }
  ]);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium'
  });
  
  const [editingTask, setEditingTask] = useState(null);

  const handleAddTask = () => {
    if (newTask.title.trim() === '') return;
    
    const task = {
      id: tasks.length + 1,
      ...newTask,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority
    });
  };

  const handleUpdateTask = () => {
    if (newTask.title.trim() === '') return;
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...newTask, id: task.id, completed: task.completed } : task
    ));
    
    setEditingTask(null);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout userRole="farmer" userName="Farmer John">
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3, color: '#2e7d32', fontWeight: 500 }}>
          Task Management
        </Typography>
        
        {/* Add/Edit Task Form */}
        <Card sx={{ mb: 3, borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Task Title"
                variant="outlined"
                fullWidth
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              />
              <TextField
                label="Due Date"
                type="date"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              />
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newTask.priority}
                  label="Priority"
                  onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              {editingTask ? (
                <Button 
                  variant="contained" 
                  startIcon={<EditIcon />}
                  onClick={handleUpdateTask}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Update Task
                </Button>
              ) : (
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={handleAddTask}
                  sx={{ 
                    backgroundColor: '#2e7d32',
                    '&:hover': {
                      backgroundColor: '#1b5e20'
                    }
                  }}
                >
                  Add Task
                </Button>
              )}
              {editingTask && (
                <Button 
                  variant="outlined" 
                  onClick={() => {
                    setEditingTask(null);
                    setNewTask({
                      title: '',
                      description: '',
                      dueDate: '',
                      priority: 'medium'
                    });
                  }}
                  sx={{ 
                    borderColor: '#2e7d32',
                    color: '#2e7d32',
                    '&:hover': {
                      borderColor: '#1b5e20',
                      backgroundColor: 'rgba(46, 125, 50, 0.04)'
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
        
        {/* Task List */}
        <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 500 }}>
              Your Tasks
            </Typography>
            <List>
              {tasks.map((task) => (
                <ListItem 
                  key={task.id} 
                  sx={{ 
                    borderBottom: '1px solid #eee',
                    '&:last-child': { borderBottom: 'none' }
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                        color="success"
                      />
                    }
                    label={
                      <Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            textDecoration: task.completed ? 'line-through' : 'none',
                            fontWeight: task.completed ? 'normal' : 'medium'
                          }}
                        >
                          {task.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="textSecondary"
                          sx={{ 
                            textDecoration: task.completed ? 'line-through' : 'none'
                          }}
                        >
                          {task.description}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                          <CalendarIcon sx={{ fontSize: 16, mr: 1 }} />
                          <Typography variant="caption" sx={{ mr: 2 }}>
                            Due: {task.dueDate}
                          </Typography>
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            color={getPriorityColor(task.priority)}
                          />
                        </Box>
                      </Box>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      aria-label="edit"
                      onClick={() => handleEditTask(task)}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default TaskManagement;