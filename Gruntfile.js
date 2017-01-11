module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['*.js'],
      options: {
        ignores: ['node_modules']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['jshint']);
};
