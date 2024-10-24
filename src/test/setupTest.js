import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from "@testing-library/react"
import { server } from './mocks/server';

beforeAll(()=>server.listen())

afterEach(()=>{
    cleanup();
    vi.clearAllMocks()
})

afterAll(()=>server.close())