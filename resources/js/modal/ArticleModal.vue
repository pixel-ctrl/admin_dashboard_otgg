<template>
    <div>
        <!-- Modal Trigger Button -->
        <button @click="openModal"
            class="relative flex items-center stroke-cyan-500 text-s px-4 py-2 ml-4 text-teal-500 cursor-pointer hover:text-teal-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Write Article
        </button>

        <!-- Modal Overlay with Transition -->
        <Teleport to="body">
            <transition name="modal-fade">
                <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center"
                    @click.self="closeModal">
                    <!-- Modal Content -->
                    <div
                        class="bg-gray-900 rounded-lg shadow-xl w-full max-w-6xl max-h-screen overflow-hidden flex flex-col">
                        <!-- Modal Header -->
                        <div class="px-6 py-4 border-b border-gray-800 flex justify-between items-center">
                            <h3 class="text-xl font-bold text-white">New Article</h3>
                            <button @click="closeModal" class="text-gray-400 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="flex-1 overflow-auto">
                            <div class="p-6 text-gray-300">
                                <p class="mb-4">Select a category and write a new blog article.</p>

                                <!-- Editor and Settings Split -->
                                <div class="flex flex-col lg:flex-row gap-6">
                                    <!-- Editor Section -->
                                    <div class="flex-1">
                                        <!-- Editor Toolbar -->
                                        <div
                                            class="bg-gray-800 border border-gray-700 rounded-t-lg p-2 flex flex-wrap gap-1">
                                            <button @click="execCommand('formatBlock', '<p>')"
                                                class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                    <path fill-rule="evenodd"
                                                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="execCommand('insertUnorderedList')"
                                                class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="execCommand('bold')"
                                                class="p-1 hover:bg-gray-700 rounded font-bold">B</button>
                                            <button @click="execCommand('italic')"
                                                class="p-1 hover:bg-gray-700 rounded italic">I</button>
                                            <button @click="execCommand('underline')"
                                                class="p-1 hover:bg-gray-700 rounded underline">U</button>
                                            <button @click="execCommand('strikeThrough')"
                                                class="p-1 hover:bg-gray-700 rounded">S</button>
                                            <div class="mx-1 border-r border-gray-600"></div>
                                            <select class="bg-gray-800 border border-gray-700 rounded p-1 text-sm"
                                                @change="execCommand('fontSize', $event.target.value)">
                                                <option value="2">12px</option>
                                                <option value="3">16px</option>
                                                <option value="4">18px</option>
                                                <option value="5">24px</option>
                                            </select>
                                            <div class="mx-1 border-r border-gray-600"></div>
                                            <button @click="execCommand('insertOrderedList')"
                                                class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="execCommand('formatBlock', '<blockquote>')"
                                                class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="execCommand('formatBlock', '<pre>')"
                                                class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <button @click="openImageDialog" class="p-1 hover:bg-gray-700 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                    viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd"
                                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                                        clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>

                                        <!-- Editor Content Area -->
                                        <div ref="editorContent"
                                            class="bg-gray-800 border border-gray-700 border-t-0 rounded-b-lg p-4 h-64 focus:outline-none overflow-auto"
                                            contenteditable="true" @input="updateContent" @focus="clearPlaceholder"
                                            @blur="restorePlaceholder">
                                            <p class="text-gray-500">Begin writing here...</p>
                                        </div>

                                        <!-- Word Count -->
                                        <div class="text-right mt-2 text-sm text-gray-500">
                                            {{ wordCount }}/5000
                                        </div>
                                    </div>

                                    <!-- Settings Section -->
                                    <div class="lg:w-1/3 space-y-6">
                                        <!-- Status -->
                                        <div>
                                            <label class="block text-sm font-medium mb-2">Status</label>
                                            <div class="relative">
                                                <select v-model="article.status"
                                                    class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 appearance-none focus:outline-none focus:border-blue-500">
                                                    <option value="draft">Draft</option>
                                                    <option value="published">Published</option>
                                                    <option value="archived">Archived</option>
                                                </select>
                                                <div
                                                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                                                    <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd"
                                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                            clip-rule="evenodd" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Title -->
                                        <div>
                                            <label class="block text-sm font-medium mb-2">Title</label>
                                            <input v-model="article.title" type="text"
                                                placeholder="SEO friendly title..."
                                                class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                                        </div>

                                        <!-- Meta Description -->
                                        <div>
                                            <label class="block text-sm font-medium mb-2">Meta Description</label>
                                            <textarea v-model="article.metaDescription" placeholder="Start writing..."
                                                rows="2"
                                                class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"></textarea>
                                        </div>

                                        <!-- Date & Author -->
                                        <div class="grid grid-cols-2 gap-4">
                                            <div>
                                                <label class="block text-sm font-medium mb-2">Date</label>
                                                <div class="relative">
                                                    <input v-model="article.date" type="date"
                                                        class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-3 focus:outline-none focus:border-blue-500">
                                                    <div
                                                        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg xmlns="http://www.w3.org/2000/svg"
                                                            class="h-5 w-5 text-gray-400" fill="none"
                                                            viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium mb-2">Author</label>
                                                <input v-model="article.author" type="text" value="Joe Doe"
                                                    class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                                            </div>
                                        </div>

                                        <!-- Tags -->
                                        <div>
                                            <label class="block text-sm font-medium mb-2">Tags</label>
                                            <div class="flex flex-wrap gap-2 mb-2">
                                                <div v-for="(tag, index) in article.tags" :key="index"
                                                    class="bg-gray-700 text-gray-200 px-2 py-1 rounded-md flex items-center">
                                                    {{ tag }}
                                                    <button @click="removeTag(index)"
                                                        class="ml-1 text-gray-400 hover:text-white">
                                                        &times;
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="flex">
                                                <input v-model="newTag" type="text" placeholder="Add tags..."
                                                    @keydown.enter.prevent="addTag"
                                                    class="block w-full bg-gray-800 border border-gray-700 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
                                                <button @click="addTag"
                                                    class="ml-2 px-3 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
                                                    Add
                                                </button>
                                            </div>
                                            <p class="text-xs text-gray-500 mt-1">You can add as many as 8 tags.</p>
                                        </div>

                                        <!-- Image Upload -->
                                        <div @click="triggerFileInput" @dragover.prevent @drop.prevent="handleFileDrop"
                                            class="bg-gray-800 border border-gray-700 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-750">
                                            <input ref="fileInput" type="file" accept="image/*" class="hidden"
                                                @change="handleFileSelect">
                                            <div v-if="!article.featuredImage" class="flex flex-col items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p class="mt-2 text-sm">Upload an image</p>
                                                <p class="text-xs text-gray-500">Click or drag and drop</p>
                                            </div>
                                            <div v-else class="flex flex-col items-center">
                                                <img :src="article.featuredImage" alt="Featured image"
                                                    class="max-h-24 object-contain mb-2">
                                                <p class="text-xs text-gray-300">Click to change image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Footer -->
                        <div class="px-6 py-4 border-t border-gray-800 flex justify-end space-x-2">
                            <button @click="closeModal" class="px-4 py-2 text-gray-400 hover:text-white">
                                Cancel
                            </button>
                            <button @click="saveArticle('draft')"
                                class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md">
                                Save Draft
                            </button>
                            <button @click="saveArticle('published')"
                                class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
                                Publish Article
                            </button>
                        </div>
                    </div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<script>
export default {
    name: 'ArticleModal',
    data() {
        return {
            showModal: false,
            isPlaceholderVisible: true,
            newTag: '',
            wordCount: 0,
            article: {
                title: '',
                content: '',
                metaDescription: '',
                status: 'draft',
                date: new Date().toISOString().split('T')[0],
                author: 'Joe Doe',
                tags: [],
                featuredImage: null
            }
        }
    },
    methods: {
        openModal() {
            this.showModal = true;
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            // Focus on title when modal opens
            this.$nextTick(() => {
                const titleInput = this.$el.querySelector('input[type="text"]');
                if (titleInput) titleInput.focus();
            });
        },
        closeModal() {
            if (this.hasChanges() && !confirm('You have unsaved changes. Are you sure you want to close?')) {
                return;
            }
            this.showModal = false;
            // Restore body scrolling
            document.body.style.overflow = 'auto';
            // Reset form
            this.resetForm();
        },
        hasChanges() {
            return this.article.title !== '' ||
                this.article.content !== '' ||
                this.article.metaDescription !== '' ||
                this.article.tags.length > 0 ||
                this.article.featuredImage !== null;
        },
        resetForm() {
            this.article = {
                title: '',
                content: '',
                metaDescription: '',
                status: 'draft',
                date: new Date().toISOString().split('T')[0],
                author: 'Joe Doe',
                tags: [],
                featuredImage: null
            };
            this.newTag = '';
            this.wordCount = 0;
            this.isPlaceholderVisible = true;

            // Reset editor content
            if (this.$refs.editorContent) {
                this.$refs.editorContent.innerHTML = '<p class="text-gray-500">Begin writing here...</p>';
            }
        },
        execCommand(command, value = null) {
            document.execCommand('styleWithCSS', false, true);
            document.execCommand(command, false, value);
            this.$refs.editorContent.focus();
            this.updateContent();
        },
        clearPlaceholder() {
            if (this.isPlaceholderVisible) {
                this.$refs.editorContent.innerHTML = '';
                this.isPlaceholderVisible = false;
            }
        },
        restorePlaceholder() {
            if (this.$refs.editorContent.innerHTML.trim() === '') {
                this.$refs.editorContent.innerHTML = '<p class="text-gray-500">Begin writing here...</p>';
                this.isPlaceholderVisible = true;
            }
        },
        updateContent() {
            const content = this.$refs.editorContent.innerHTML;
            if (!this.isPlaceholderVisible) {
                this.article.content = content;

                // Calculate word count from HTML content
                const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
                this.wordCount = text ? text.split(' ').length : 0;
            } else {
                this.article.content = '';
                this.wordCount = 0;
            }
        },
        addTag() {
            if (this.newTag.trim() && this.article.tags.length < 8) {
                // Check for duplicates
                if (!this.article.tags.includes(this.newTag.trim())) {
                    this.article.tags.push(this.newTag.trim());
                }
                this.newTag = '';
            }
        },
        removeTag(index) {
            this.article.tags.splice(index, 1);
        },
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileSelect(event) {
            const file = event.target.files[0];
            if (file) {
                this.processImageFile(file);
            }
        },
        handleFileDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.processImageFile(file);
            }
        },
        processImageFile(file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.article.featuredImage = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        },
        openImageDialog() {
            const imageUrl = prompt('Enter image URL:');
            if (imageUrl) {
                this.execCommand('insertImage', imageUrl);
            }
        },
        saveArticle(status) {
            this.article.status = status;

            // Validate required fields
            if (!this.article.title) {
                alert('Please enter a title for your article');
                return;
            }

            if (this.isPlaceholderVisible || !this.article.content.trim()) {
                alert('Please add some content to your article');
                return;
            }

            // Here you would normally send the data to your backend
            console.log('Saving article:', this.article);

            // For demonstration, show success message and close modal
            alert(`Article ${status === 'published' ? 'published' : 'saved as draft'} successfully!`);
            this.closeModal();

            // You could emit an event here to notify parent component
            this.$emit('article-saved', this.article);
        }
    }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.3s;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}
</style>