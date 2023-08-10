// import dbConnect from '../../../lib/dbConnect';
// import Task from '../../../models/Task';

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === 'POST') {
//     const { title, description, dueDate } = req.body;
//     try {
//       const task = new Task({
//         title,
//         description,
//         dueDate,
//         completed: false,
//       });
//       await task.save();
//       res.status(201).json(task);
//     } catch (error) {
//       console.error('Error creating task:', error);
//       res.status(500).json({ error: 'Error creating task' });
//     }
//   } else if (req.method === 'GET') {
//     try {
//       const tasks = await Task.find();
//       res.status(200).json(tasks);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       res.status(500).json({ error: 'Error fetching tasks' });
//     }
//   }
// }
