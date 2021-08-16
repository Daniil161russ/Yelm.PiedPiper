<template>
  <button class="circle">
    <span v-if="type === 'notification'" class="circle__icon">
      <Bell />
    </span>
    <span v-else-if="type === 'go-back'" class="circle__icon">
      <Arrow />
    </span>
    <span v-else-if="type === 'delete'" class="circle__icon">
      <Trash />
    </span>
    <span v-else-if="type === 'edit'" class="circle__icon">
      <Edit />
    </span>
    <span v-else-if="type === 'add'" class="circle__icon">
      <Plus />
    </span>
  </button>
</template>

<script>
import Bell from '@/assets/icons/buttons/bell.svg?inline';
import Arrow from '@/assets/icons/buttons/arrow.svg?inline';
import Trash from '@/assets/icons/buttons/trash.svg?inline';
import Edit from '@/assets/icons/buttons/edit.svg?inline';
import Plus from '@/assets/icons/buttons/plus.svg?inline';

export default {
  components: {
    Bell, Arrow, Trash, Edit, Plus
  },
 props: {
   type: {
     type: String,
     required: true
   }
 }
}
</script>

