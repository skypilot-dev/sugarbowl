import { checkIsInBoundary } from '../checkIsInBoundary';

describe('checkIsInBoundary(targetPath)', () => {
  it('should always resolve paths', () => {
    expect.assertions(8);
    {
      const boundaryPaths = ['', '.']; // resolves to project directory
      const targetPaths = ['./child', 'child']; // resolve to child of project directory
      const expected = true;

      boundaryPaths.forEach(path => {
        targetPaths.forEach(targetPath => {
          expect(
            checkIsInBoundary(targetPath, { path, scope: 'children' })
          ).toBe(expected);
        });
      });
    }
    {
      const boundaryPath = '/parent'; // resolves to parent directory
      const targetPaths = ['/parent/../parent', '/parent/child/..']; // also resolves to parent

      targetPaths.forEach(targetPath => {
        expect(
          checkIsInBoundary(targetPath,  { path: boundaryPath, scope: 'self' })
        ).toBe(true);
        expect(
          checkIsInBoundary(targetPath, { path: boundaryPath, scope: 'children' })
        ).toBe(false);
      });
    }
  });

  describe('when scope=self', () => {
    it('should return true if the target path is the same as the boundary path', () => {
      const boundaryPath = '/parent';
      const targetPaths = ['/parent', '/parent/'];
      const scope = 'self';
      const expected = true;

      targetPaths.forEach(targetPath => {
        expect(
          checkIsInBoundary(targetPath, { path: boundaryPath, scope })
        ).toBe(expected);
      });
    });

    it('should return false if the target path is not the same as the boundary path', () => {
      const boundaryPath = '/parent';
      const targetPaths = ['/', '/unrelated', '/parent/child', ''];
      const scope = 'self';
      const expected = false;

      targetPaths.forEach(targetPath => {
        expect(
          checkIsInBoundary(targetPath, { path: boundaryPath, scope })
        ).toBe(expected);
      });
    });
  });

  describe('when scope=children', () => {
    it('should return true if the target path is a child of the boundary path', () => {
      const boundaryPath = '/parent';
      const targetPaths = ['/parent/child', '/parent/child/'];
      const scope = 'children';
      const expected = true;

      targetPaths.forEach(targetPath => {
        expect(
          checkIsInBoundary(targetPath, { path: boundaryPath, scope })
        ).toBe(expected);
      });
    });

    it('should return false if the target path is not a child of the boundary path', () => {
      const boundaryPath = '/parent';
      const targetPaths = ['/', '/sibling', '/sibling/child', '', '/parent-2'];
      const scope = 'children';
      const expected = false;

      targetPaths.forEach(targetPath => {
        expect(
          checkIsInBoundary(targetPath, { path: boundaryPath, scope })
        ).toBe(expected);
      });
    });

    it('should return false if the target path is the same as the boundary path', () => {
      const boundaryPath = '/parent';
      const targetPath = '/parent';
      const scope = 'children';
      const expected = false;

      expect(
        checkIsInBoundary(targetPath, { path: boundaryPath, scope })
      ).toBe(expected);
    });
  });
});
