import type { Meta, StoryObj } from '@storybook/react-vite';
import ToastProvider from './ToastProvider';
import ToastContainer from './ToastContainer';
import useToast from './useToast';

const meta = {
  title: 'Feedback/Toast',
  component: ToastProvider,
  args: {
    maxSnackBar: 3,
  },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

const MAX = 3;
const MIN = 1;

export const Default: Story = {
  args: {
    maxSnackBar: 3,
  },
  render: (args) => {
    return (
      <ToastProvider {...args}>
        <SimpleTest />
        <ToastContainer />
      </ToastProvider>
    );
  },
};

const variants = ["error", "success", "default"];
// Ultra-simple test component
function SimpleTest() {
  const { addToast } = useToast();
  
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("🔥🔥🔥 BUTTON DEFINITELY CLICKED! 🔥🔥🔥");
    
    const random = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
    const variant = variants[random - 1];

    try {
      if (addToast && typeof addToast === 'function') {
        console.log("✅ Calling addToast...");
        addToast({
          message: 'Test toast message',
          type: variant as any,
          duration: 5000,
        });
        console.log("✅ addToast called successfully");
      } else {
        console.error("❌ addToast is not a function:", typeof addToast);
      }
    } catch (error) {
      console.error("❌ Error in click handler:", error);
    }
  };
  
  // Test if basic click works
  const testClick = () => {
    console.log("🎯 TEST CLICK WORKS!");
  };
  
  return (
    <div style={{ padding: '50px', backgroundColor: '#f0f0f0' }}>
      <h2>Toast Test</h2>
      
      {/* Basic test button */}
      <button 
        onClick={testClick}
        style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: '2px solid #1e7e34',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Click (Should log "TEST CLICK WORKS!") to check for z-index layering issues
      </button>
      
      <br />
      
      {/* Toast button */}
      <button 
        onClick={handleClick}
        style={{
          padding: '15px 30px',
          margin: '10px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: '2px solid #0056b3',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Add Toast (Should show toast)
      </button>
      
      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'white', border: '1px solid #ccc' }}>
        <strong>Debug Info:</strong><br />
        addToast available: {addToast ? '✅ Yes' : '❌ No'}<br />
        addToast type: {typeof addToast}
      </div>
    </div>
  );
}
