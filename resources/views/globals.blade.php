<script>
    window.Laravel = <?php echo json_encode([
        'csrfToken' => csrf_token(),
        'baseUrl' => url(''),
        'isGuest' => Auth::guest(),
    ]); ?>;

    @if (!Auth::guest())
        Laravel.user = {
            name: '{{ Auth::user()->name }}',
            email: '{{ Auth::user()->email }}',
        };
    @endif

    Laravel.errors = {};
</script>

@foreach ($errors->keys() as $key)
    <script>
        Laravel.errors['{{ $key }}'] = '{{ $errors->first($key) }}';
    </script>
@endforeach

<script>
    Laravel.oldInputs = JSON.parse('{!! json_encode(old()) !!}');
</script>
