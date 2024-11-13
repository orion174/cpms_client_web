type Callback = () => void;

class CallbackStore {
    private callbacks: Map<string, Callback> = new Map();

    setCallback(id: string, callback: Callback) {
        this.callbacks.set(id, callback);
    }

    getCallback(id: string): Callback | undefined {
        return this.callbacks.get(id);
    }

    removeCallback(id: string) {
        this.callbacks.delete(id);
    }
}

const callbackStore = new CallbackStore();

export default callbackStore;