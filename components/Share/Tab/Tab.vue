<template>
    <div class="tab">
        <nav class="tab__nav" role="nav">
            <ul>
                <slot name="nav"></slot>
            </ul>
        </nav>
        <div class="tab__content">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script>
export default {};
</script>