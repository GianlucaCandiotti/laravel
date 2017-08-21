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
     * Execute the console command.
     *
     * @return void
     */
    public function fire()
    {
        $this->createDirectories();

        $this->exportViews();
        $this->exportPages();

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

        if (! is_dir(base_path('resources/assets/js/pages'))) {
            mkdir(base_path('resources/assets/js/pages'), 0755, true);
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


    function copyDirectory($source, $destination) {
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

    /**
     * Export the pages.
     *
     * @return void
     */
    protected function exportPages()
    {
        foreach ($this->pages as $value) {
            $this->copyDirectory(
                __DIR__.'/stubs/make/pages/'.$value,
                base_path('resources/assets/js/pages/'.$value)
            );
        }
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
