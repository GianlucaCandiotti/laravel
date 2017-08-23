<?php

namespace App\Console\Commands\Auth;

use Illuminate\Console\Command;
use Illuminate\Console\DetectsApplicationNamespace;

class AuthMakeCommand extends Command
{
    use DetectsApplicationNamespace;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:auth
                    {--views : Only scaffold the authentication views}
                    {--force : Overwrite existing views by default}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Scaffold basic login and registration views and routes';

    /**
     * The views that need to be exported.
     *
     * @var array
     */
    protected $views = [
        'auth/login.stub' => 'auth/login.blade.php',
        'auth/register.stub' => 'auth/register.blade.php',
        'auth/passwords/email.stub' => 'auth/passwords/email.blade.php',
        'auth/passwords/reset.stub' => 'auth/passwords/reset.blade.php',
        'home.stub' => 'home.blade.php',
    ];

    /**
     * The injectors that need to be exported.
     *
     * @var array
     */
    protected $injectors = [
        'injectors/status.stub' => 'injectors/status.blade.php',
        'injectors/token.stub' => 'injectors/token.blade.php',
    ];

    /**
     * The page components that need to be exported.
     *
     * @var array
     */
    protected $pages = [
        'Home',
        'Login',
        'PasswordsEmail',
        'PasswordsReset',
        'Register',
    ];

    /**
     * The components that need to be exported.
     *
     * @var array
     */
    protected $components = [
        'NavBar',
        'Notification',
        'Panel',
    ];

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $this->createDirectories();

        $this->exportViews();
        $this->exportInjectors();
        $this->exportPages();
        $this->exportComponents();

        if (! $this->option('views')) {
            file_put_contents(
                app_path('Http/Controllers/HomeController.php'),
                $this->compileControllerStub()
            );

            file_put_contents(
                base_path('routes/web.php'),
                file_get_contents(__DIR__.'/stubs/make/routes.stub'),
                FILE_APPEND
            );
        }

        $this->info('Authentication scaffolding generated successfully.');
    }

    /**
     * Create the directories for the files.
     *
     * @return void
     */
    protected function createDirectories()
    {
        if (! is_dir(base_path('resources/views/auth/passwords'))) {
            mkdir(base_path('resources/views/auth/passwords'), 0755, true);
        }

        if (! is_dir(base_path('resources/views/injectors'))) {
            mkdir(base_path('resources/views/injectors'), 0755, true);
        }

        if (! is_dir(base_path('resources/assets/js/pages'))) {
            mkdir(base_path('resources/assets/js/pages'), 0755, true);
        }

        if (! is_dir(base_path('resources/assets/js/components'))) {
            mkdir(base_path('resources/assets/js/components'), 0755, true);
        }
    }

    /**
     * Utility function for copying the whole contents of a directory
     * into another.
     *
     * @return void
     */
    function copyDirectory($dirArr, $sourcePath, $destinationPath) {
        foreach ($dirArr as $value) {
            $source = $sourcePath . $value;
            $destination = $destinationPath . $value;

            if (is_dir($source)) {
                @mkdir($destination);

                $directory = dir($source);

                while (FALSE !== ($read_directory = $directory->read())) {
                    if ($read_directory == '.' || $read_directory == '..') {
                        continue;
                    }

                    $path_dir = $source . '/' . $read_directory;

                    if (is_dir( $path_dir)) {
                        $this->copyDirectory($path_dir, $destination . '/' . $read_directory);
                        continue;
                    }

                    copy($path_dir, $destination . '/' . $read_directory);
                }

                $directory->close();
            } else {
                copy($source, $destination);
            }
        }
    }

    /**
     * Export the authentication views.
     *
     * @return void
     */
    protected function exportViews()
    {
        foreach ($this->views as $key => $value) {
            if (file_exists(resource_path('views/'.$value)) && ! $this->option('force')) {
                if (! $this->confirm("The [{$value}] view already exists. Do you want to replace it?")) {
                    continue;
                }
            }
            copy(
                __DIR__.'/stubs/make/views/'.$key,
                resource_path('views/'.$value)
            );
        }
    }

    /**
     * Export the injectors.
     *
     * @return void
     */
    protected function exportInjectors()
    {
        foreach ($this->injectors as $key => $value) {
            if (file_exists(resource_path('views/'.$value)) && ! $this->option('force')) {
                if (! $this->confirm("The [{$value}] injector already exists. Do you want to replace it?")) {
                    continue;
                }
            }
            copy(
                __DIR__.'/stubs/make/injectors/'.$key,
                resource_path('views/'.$value)
            );
        }
    }

    /**
     * Export the pages.
     *
     * @return void
     */
    protected function exportPages()
    {
        $this->copyDirectory(
            $this->pages,
            __DIR__.'/stubs/make/pages/',
            base_path('resources/assets/js/pages/')
        );
    }

    /**
     * Export the components.
     *
     * @return void
     */
    protected function exportComponents()
    {
        $this->copyDirectory(
            $this->components,
            __DIR__.'/stubs/make/components/',
            base_path('resources/assets/js/components/')
        );
    }

    /**
     * Compiles the HomeController stub.
     *
     * @return string
     */
    protected function compileControllerStub()
    {
        return str_replace(
            '{{namespace}}',
            $this->getAppNamespace(),
            file_get_contents(__DIR__.'/stubs/make/controllers/HomeController.stub')
        );
    }
}
