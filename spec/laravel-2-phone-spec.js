'use babel';

import Laravel2Phone from '../lib/laravel-2-phone';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Laravel2Phone', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('laravel-2-phone');
  });

  describe('when the laravel-2-phone:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.laravel-2-phone')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'laravel-2-phone:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.laravel-2-phone')).toExist();

        let laravel2PhoneElement = workspaceElement.querySelector('.laravel-2-phone');
        expect(laravel2PhoneElement).toExist();

        let laravel2PhonePanel = atom.workspace.panelForItem(laravel2PhoneElement);
        expect(laravel2PhonePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'laravel-2-phone:toggle');
        expect(laravel2PhonePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.laravel-2-phone')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'laravel-2-phone:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let laravel2PhoneElement = workspaceElement.querySelector('.laravel-2-phone');
        expect(laravel2PhoneElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'laravel-2-phone:toggle');
        expect(laravel2PhoneElement).not.toBeVisible();
      });
    });
  });
});
